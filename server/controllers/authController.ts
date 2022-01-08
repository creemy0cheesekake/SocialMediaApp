import User from "../schemas/userSchema";
import { hashPassword, comparePassword } from "../modules/bcrypt";
import validator from "validator";
import { Request, Response } from "express";

export const createNewUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const {
			usernameVal: username,
			emailVal: email,
			passwordVal: password,
		} = req.body;

		if (!validator.isStrongPassword(password))
			throw new Error(
				"Password must be at least 8 characters long, and must contain a lowercase letter, upper case letter, number, and a special character."
			);

		if (!!(await User.findOne({ username: { $eq: username } })))
			throw new Error("Username already exists.");
		if (!!(await User.findOne({ email: { $eq: email } })))
			throw new Error("Email already exists.");

		const hashedPassword = await hashPassword(password);

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
