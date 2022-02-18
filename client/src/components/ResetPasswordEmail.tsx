import React, { useState } from "react";
import "../styles/AuthPages.scss";

interface Props {}

const Login: React.FC<Props> = (props: Props) => {
	const [emailVal, setEmailVal] = useState("");
	const [statusMessage, setStatusMessage] = useState("");
	const [statusMessageColor, setStatusMessageColor] = useState("");

	const handleSendEmail = async () => {
		setStatusMessageColor("#786428");
		setStatusMessage("Loading...");
		const data = await (
			await fetch(
				process.env.REACT_APP_API_DOMAIN_NAME + "/sendResetEmail",
				{
					method: "POST",
					body: JSON.stringify({
						recipient: emailVal,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
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
					<h1>Reset Password</h1>
				</div>
				<div className="auth-forms">
					<label htmlFor="email">
						Enter email associated with your account. You will
						receive a reset password link in your inbox.
					</label>
					<input
						type="email"
						name="email"
						value={emailVal}
						onChange={e => setEmailVal(e.target.value)}
					/>
					<button onClick={handleSendEmail}>Send Email</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
