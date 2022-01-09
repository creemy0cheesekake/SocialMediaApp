import express from "express";
import {
	createNewUser,
	logInUser,
	passwordReset,
} from "../controllers/authController";

const router = express.Router();

router.route("/register").post(createNewUser);

router.route("/login").post(logInUser);

router.route("/resetEmail").get(passwordReset);

export default router;
