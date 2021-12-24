import React from "react";
import "../styles/AuthPages.scss";

interface Props {}

const Login: React.FC<Props> = (props: Props) => {
	return (
		<div className="auth-container">
			<div className="auth-content">
				<div className="auth-header">
					<h1>Log In</h1>
				</div>
				<div className="auth-forms">
					<label htmlFor="email-or-username">Email or Username</label>
					<input type="text" name="email-or-username" />
					<label htmlFor="password">Password</label>
					<input type="password" name="password" />
					<button>Create Account</button>
					<a href=".auth-forms">Already have an account? Log in</a>
				</div>
			</div>
		</div>
	);
};

export default Login;
