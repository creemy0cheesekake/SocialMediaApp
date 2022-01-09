import React, { useState } from "react";
import "../styles/AuthPages.scss";

interface Props {}

const Login: React.FC<Props> = (props: Props) => {
	const [usernameOrEmailVal, setUsernameOrEmailVal] = useState("");
	const [passwordVal, setPasswordVal] = useState("");
	const [statusMessage, setStatusMessage] = useState("");
	const [statusMessageColor, setStatusMessageColor] = useState("");

	const handleLogin = async () => {
		setStatusMessageColor("#dd4444");
		setStatusMessage("");
		const data = await (
			await fetch("http://localhost:3000/login", {
				method: "POST",
				body: JSON.stringify({
					usernameOrEmailVal,
					passwordVal,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})
		).json();
		setStatusMessage(data.message);
		if (data.success) setStatusMessageColor("#407540");
	};

	return (
		<div className="auth-container column">
			<div
				className="error-message"
				style={{
					backgroundColor: statusMessageColor,
					visibility: statusMessage.length ? "visible" : "hidden",
				}}
			>
				{statusMessage}
			</div>
			<div className="auth-content">
				<div className="auth-header">
					<h1>Log In</h1>
				</div>
				<div className="auth-forms">
					<label htmlFor="email-or-username">Email or Username</label>
					<input
						type="text"
						name="email-or-username"
						value={usernameOrEmailVal}
						onChange={e => setUsernameOrEmailVal(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={passwordVal}
						onChange={e => setPasswordVal(e.target.value)}
					/>
					<button onClick={handleLogin}>Create Account</button>
					<a href=".auth-forms">Already have an account? Log in</a>
				</div>
			</div>
		</div>
	);
};

export default Login;
