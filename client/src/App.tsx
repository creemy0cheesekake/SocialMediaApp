import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ResetPasswordEmail from "./components/ResetPasswordEmail";
import ResetPassword from "./components/ResetPassword";

import { authContext } from "./contexts/authContext";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	return (
		<authContext.Provider value={{ loggedIn, setLoggedIn }}>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/register" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route path="/reset" element={<ResetPasswordEmail />} />
					<Route path="/reset-password" element={<ResetPassword />} />

					<Route path="*" element={<HomePage />} />
				</Routes>
			</Router>
		</authContext.Provider>
	);
}

export default App;
