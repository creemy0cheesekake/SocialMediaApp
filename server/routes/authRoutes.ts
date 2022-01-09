import express from "express";
import {
	createNewUser,
	logInUser,
	passwordReset,
	updatePassword,
} from "../controllers/authController";

const router = express.Router();

router.route("/register").post(createNewUser);

router.route("/login").post(logInUser);

router.route("/sendResetEmail").post(passwordReset);

router
	.route("/resetPassword")
	.post(updatePassword)
	.get((req, res) => res.send("hi"));

export default router;
