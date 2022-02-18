import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/AuthPages.scss";

interface Props {}

const Login: React.FC<Props> = (props: Props) => {
	const [newPasswordVal, setNewPasswordVal] = useState("");
	const [confirmNewPasswordVal, setConfirmNewPasswordVal] = useState("");
	const [statusMessage, setStatusMessage] = useState("");
	const [statusMessageColor, setStatusMessageColor] = useState("");

	const [searchParams] = useSearchParams();

	const handleSendEmail = async () => {
		setStatusMessageColor("#786428");
		setStatusMessage("Loading...");
		if (newPasswordVal !== confirmNewPasswordVal)
			return setStatusMessage("Passwords do not match.");

		const data = await (
			await fetch(
				process.env.REACT_APP_API_DOMAIN_NAME + "/resetPassword",
				{
					method: "POST",
					body: JSON.stringify({
						sid: searchParams.get("sid"),
						id: searchParams.get("id"),
						newPassword: newPasswordVal,
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
					<label htmlFor="password">New Password</label>
					<input
						type="password"
						name="password"
						value={newPasswordVal}
						onChange={e => setNewPasswordVal(e.target.value)}
					/>
					<label htmlFor="confirm-password">Confirm Password</label>
					<input
						type="password"
						name="confirm-password"
						value={confirmNewPasswordVal}
						onChange={e => setConfirmNewPasswordVal(e.target.value)}
					/>
					<button onClick={handleSendEmail}>Send Email</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
