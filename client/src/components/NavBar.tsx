import React from "react";
import "../styles/NavBar.scss";

const NavBar = () => {
	return (
		<div className="NavBar">
			<h1>[Logo]</h1>
			<div className="NavBar-links">
				<a href="#">Link 1</a>
				<a href="#">Link 2</a>
				<a href="#">Link 3</a>
				<a href="#">Link 4</a>
			</div>
			<div className="NavBar-login-signup-buttons-container">
				<button>Log In</button>
				<button>Sign Up</button>
			</div>
		</div>
	);
};

export default NavBar;
