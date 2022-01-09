import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(
		parseInt(<string>process.env.BCRYPT_SALT_ROUNDS)
	);
	return bcrypt.hash(password, salt);
};

export const comparePassword = async (
	password: string,
	hashedPassword: string
) => {
	return bcrypt.compare(password, hashedPassword);
};
