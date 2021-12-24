import React from "react";
import "../styles/AuthPages.scss";

interface Props {}

const SignUp = (props: Props) => {
	return (
		<div className="auth-container">
			<div className="auth-content">
				<div className="auth-header">
					<h1>Create Account</h1>
				</div>
				<div className="auth-forms">
					<label htmlFor="username">Username</label>
					<input type="text" name="username" />
					<label htmlFor="email">Email</label>
					<input type="text" name="email" />
					<label htmlFor="password">Password</label>
					<input type="password" name="password" />
					<button>Create Account</button>
					<a href=".auth-forms">Already have an account? Log in</a>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
