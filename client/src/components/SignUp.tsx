import React, { useState } from "react";
import "../styles/AuthPages.scss";

interface Props {}

const SignUp: React.FC<Props> = (props: Props) => {
	const [usernameVal, setUsernameVal] = useState("");
	const [emailVal, setEmailVal] = useState("");
	const [passwordVal, setPasswordVal] = useState("");
	const [confirmPasswordVal, setConfirmPasswordVal] = useState("");
	const [statusMessage, setStatusMessage] = useState("");
	const [statusMessageColor, setStatusMessageColor] = useState("");

	const handleSubmitForm = async () => {
		setStatusMessageColor("#786428");
		setStatusMessage("Loading...");
		if (passwordVal !== confirmPasswordVal)
			return setStatusMessage("Passwords do not match.");
		const data = await (
			await fetch(process.env.REACT_APP_API_DOMAIN_NAME + "/register", {
				method: "POST",
				body: JSON.stringify({
					usernameVal,
					emailVal,
					passwordVal,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})
		).json();
		setStatusMessage(data.message);
		if (data.success) setStatusMessageColor("#407540");
		else setStatusMessageColor("#dd4444");
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
					<h1>Create Account</h1>
				</div>
				<div className="auth-forms">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						value={usernameVal}
						onChange={e => setUsernameVal(e.target.value)}
					/>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						value={emailVal}
						onChange={e => setEmailVal(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={passwordVal}
						onChange={e => setPasswordVal(e.target.value)}
					/>
					<label htmlFor="confirm-password">Confirm Password</label>
					<input
						type="password"
						name="confirm-password"
						value={confirmPasswordVal}
						onChange={e => setConfirmPasswordVal(e.target.value)}
					/>
					<button onClick={handleSubmitForm}>Create Account</button>
					<a href="/login">Already have an account? Log in</a>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
