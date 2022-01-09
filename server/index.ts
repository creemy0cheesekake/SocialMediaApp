import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import router from "./routes/authRoutes";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const mongoURI = "mongodb://localhost/socialmediaappdb";

const app = express();
app.use(bodyParser.json());
app.use(cors());

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

app.listen(3000, () => console.log("running on port 3000"));
