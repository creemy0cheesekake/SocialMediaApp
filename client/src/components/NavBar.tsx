import React from "react";
import "../styles/NavBar.scss";
import { useNavigate } from "react-router-dom";

interface Props {}

const NavBar: React.FC<Props> = (props: Props) => {
	const navigate = useNavigate();
	const handleLogout = () => {
		fetch(process.env.REACT_APP_API_DOMAIN_NAME + "/logout", {
			credentials: "include",
		});
		navigate("/login");
	};
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
				<button onClick={handleLogout}>Log Out</button>
			</div>
		</div>
	);
};

export default NavBar;
