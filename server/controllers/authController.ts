import User from "../schemas/userSchema";
import { hashPassword, comparePassword } from "../modules/bcrypt";
import validator from "validator";
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const createNewUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// get username email and password from data sent from client
		const {
			usernameVal: username,
			emailVal: email,
			passwordVal: password,
		} = req.body;

		// throws error if password isnt strong enough
		if (!validator.isStrongPassword(password))
			throw new Error(
				"Password must be at least 8 characters long, and must contain a lowercase letter, upper case letter, number, and a special character."
			);

		// throws error if the username or email already exist
		if (!!(await User.findOne({ username: { $eq: username } })))
			throw new Error("Username already exists.");
		if (!!(await User.findOne({ email: { $eq: email } })))
			throw new Error("Email already exists.");

		const hashedPassword = await hashPassword(password);

		// stores user in db
		await User.create({
			username,
			email,
			hashedPassword,
		});
		res.json({
			success: true,
			message: "User created successfully.",
		});
	} catch (err: any) {
		res.json({
			success: false,
			message: err.message,
		});
	}
};

export const logInUser = async (req: Request, res: Response): Promise<void> => {
	// default loggedIn to false so if it doesnt make it to the end of the try block it'll be false
	let loggedIn = false;
	let message;
	try {
		// Get user's inputted username/email and password
		const { usernameOrEmailVal: usernameOrEmail, passwordVal: password } =
			req.body;

		// find user containing that username/email in the db
		const user: any = await User.findOne({
			$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
		});
		// if user doesnt exist throw error
		if (!user) throw new Error("User not found.");

		// log in user with inputted password
		loggedIn = await comparePassword(password, user.hashedPassword);
		if (loggedIn) message = "User logged in successfully.";
		else throw new Error("Incorrect password.");
	} catch (err: any) {
		message = err.message;
	}
	res.json({
		success: loggedIn,
		message,
	});
};

export const passwordReset = async (req: Request, res: Response) => {
	try {
		// create and add password reset id to user to include in reset link
		// generate id
		const id = crypto.randomBytes(20).toString("hex");
		const user = await User.findOne({ email: req.body.recipient });
		if (!user) throw new Error("User not found: " + req.body.recipient);
		user.resetId = id;

		// gets date x minutes in future, which will be set as the expiration time for the reset link.
		const getDateByMinutesInFuture = (minutesInFuture: number) => {
			const date = new Date();
			date.setMinutes(date.getMinutes() + minutesInFuture);
			return date;
		};

		// set expiration date
		const LINK_VALID_FOR_X_MINUTES = 5;
		user.resetIdExpiration = getDateByMinutesInFuture(
			LINK_VALID_FOR_X_MINUTES
		);

		// save changes to user
		await user.save();

		// create email transporter
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_ADDRESS,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const resetLink = `${
			process.env.CLIENT_DOMAIN_NAME
		}/reset-password?sid=${user.resetId}&id=${user._id.toString()}`;

		// send email
		await transporter.sendMail({
			from: `"Social Media App" <${process.env.EMAIL_ADDRESS}>`,
			to: req.body.recipient,
			subject: "Social Media App password reset",
			html: `<h3>Click the following link to reset your password. This link will be valid for ${LINK_VALID_FOR_X_MINUTES} minutes.</h3><br><a href='${resetLink}'>Click this to reset your password</a><br><br><br><p>If you never requested a password reset, you can safely disregard this email and delete it.</p>`,
		});
		res.json({
			success: true,
			message: `Email  to ${req.body.recipient} sent successfully.`,
		});
	} catch (err: any) {
		res.status(404).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};

export const updatePassword = async (req: Request, res: Response) => {
	try {
		// this boolean will check whether or not the link is expired or if the user modified the link for some reason.
		const user = await User.findById(req.body.id);

		if (!user)
			throw new Error(
				"There was some error. Try clicking the link again or receiving a new link."
			);
		if (user.resetId !== req.body.sid)
			throw new Error(
				"There was some error. Try clicking the link again or receiving a new link."
			);

		// if the links expiration time has passed already
		if (new Date(new Date().toISOString()) > user.resetIdExpiration)
			throw new Error("Sorry, the link has expired.");

		// update password
		user.hashedPassword = await hashPassword(req.body.newPassword);

		// deleting resetId and expiration until next time the user wants to reset their password, which means this current link is now useless
		user.resetId = undefined;
		user.resetIdExpiration = undefined;
		user.save();

		res.status(200).json({
			success: true,
			message: "Your password has been updated.",
		});
	} catch (err: any) {
		res.status(404).json({
			success: false,
			message: err.message,
		});
	}
};
