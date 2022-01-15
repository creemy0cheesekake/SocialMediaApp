import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import router from "./routes/authRoutes";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const mongoURI = "mongodb://localhost/socialmediaappdb";

const app = express();
app.use(bodyParser.json());
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_DOMAIN_NAME,
	})
);
app.use(cookieParser());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", process.env.CLIENT_DOMAIN_NAME);
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

app.use(
	session({
		secret: "secretKey",
		resave: false,
		saveUninitialized: false,
	})
);

app.use("/api/v1/", router);

mongoose.connect(mongoURI, () => {
	console.log("connected to mongoose");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`running on port ${PORT}`));
