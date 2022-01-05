import User from "../schemas/userSchema";
import { hashPassword, comparePassword } from "../modules/bcrypt";
import validator from "validator";
import { Request, Response } from "express";

export const createNewUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	console.log(req.body);
	// @ts-ignore error "Property 'isLoggedIn' does not exist on type 'Session & Partial<SessionData>'." is not correct
	req.session.isLoggedIn = true;
	try {
		const username: string = "bob";
		const email: string = "bob@bob.com";
		const password: string = "bOb123!!!!";

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
		res.send("user created successfully");
	} catch (err: any) {
		res.send(err.message);
	}
};

export const logInUser = async (
	req: Request,
	res: Response
): Promise<boolean> => {
	const usernameOrEmail: string = "bob";
	const password: string = "bOb123!!!!";

	const user: any = await User.findOne({
		$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
	});
	return comparePassword(password, user.hashedPassword);
};
