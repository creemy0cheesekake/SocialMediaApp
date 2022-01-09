import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username not provided."],
	},
	email: {
		type: String,
		required: [true, "Email not provided."],
		lowercase: true,
		validate: [validator.isEmail, "Invalid email."],
	},
	hashedPassword: {
		type: String,
		required: true,
	},
	resetId: String,
	resetIdExpiration: Date,
});

export default mongoose.model("User", userSchema);
