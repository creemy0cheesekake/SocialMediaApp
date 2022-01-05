import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import router from "./routes/authRoutes";
import ConnectMongoDBSession from "connect-mongodb-session";
import { urlencoded } from "body-parser";
const MongoDBSession = ConnectMongoDBSession(session);

const mongoURI = "mongodb://localhost/socialmediaappdb";

const app = express();
app.use(
	urlencoded({
		extended: true,
	})
);

const store = new MongoDBSession({
	uri: mongoURI,
	collection: "sessions",
});

app.use(
	session({
		secret: "secretKey",
		resave: false,
		saveUninitialized: false,
		store,
	})
);

app.use("/", router);

mongoose.connect(mongoURI, () => {
	console.log("connected to mongoose");
});

app.listen(3000, () => console.log("running on port 3000"));
