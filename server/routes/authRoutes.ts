import express from "express";
import {
	createNewUser,
	logInUser,
	passwordReset,
	updatePassword,
	requireAuth,
	logOut,
} from "../controllers/authController";

const router = express.Router();

router.route("/register").post(createNewUser);

router.route("/login").post(logInUser);

router.route("/sendResetEmail").post(passwordReset);

router.route("/resetPassword").post(updatePassword);

router.route("/requireAuth").get(requireAuth);

router.route("/logout").get(logOut);

export default router;
