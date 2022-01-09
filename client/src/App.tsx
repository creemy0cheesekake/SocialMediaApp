import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ResetPasswordEmail from "./components/ResetPasswordEmail";
import ResetPassword from "./components/ResetPassword";

function App() {
	return (
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
	);
}

export default App;
