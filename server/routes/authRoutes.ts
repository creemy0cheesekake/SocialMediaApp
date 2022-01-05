import express from "express";
import { createNewUser, logInUser } from "../controllers/authController";

const router = express.Router();

router.route("/register").post(createNewUser);

router.route("/login").post(logInUser);

export default router;
