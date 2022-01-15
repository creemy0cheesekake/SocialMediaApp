import React, { useState } from "react";
import "../styles/AuthPages.scss";
import { useNavigate } from "react-router-dom";

interface Props {}

const Login: React.FC<Props> = (props: Props) => {
	const [usernameOrEmailVal, setUsernameOrEmailVal] = useState("");
	const [passwordVal, setPasswordVal] = useState("");
	const [statusMessage, setStatusMessage] = useState("");
	const [statusMessageColor, setStatusMessageColor] = useState("");
	const navigate = useNavigate();

	const handleLogin = async () => {
		setStatusMessageColor("#786428");
		setStatusMessage("Loading...");
		const data = await (
			await fetch(process.env.REACT_APP_API_DOMAIN_NAME + "/login", {
				method: "POST",
				credentials: "include",
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
		if (data.success) {
			setStatusMessageColor("#407540");
			navigate("/");
		} else setStatusMessageColor("#dd4444");
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
					<button onClick={handleLogin}>Log in</button>
					<a href="/register">Don't have an account? Sign up</a>
					<a href="/reset">Forgot your password?</a>
				</div>
			</div>
		</div>
	);
};

export default Login;
