import React from "react";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/register" element={<SignUp />} />
				<Route path="/Login" element={<Login />} />

				<Route path="*" element={<HomePage />} />
			</Routes>
		</Router>
	);
}

export default App;
