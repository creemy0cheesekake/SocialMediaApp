import React, { useContext, useEffect } from "react";
import AddPost from "./AddPost";
import NavBar from "./NavBar";
import OtherLinks from "./OtherLinks";
import PopularFeed from "./PopularFeed";
import "../styles/HomePage.scss";

import { authContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

interface Props {}

const HomePage: React.FC<Props> = (props: Props) => {
	const { loggedIn } = useContext(authContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (!loggedIn) navigate("/login");
	}, []);
	return (
		<div>
			<NavBar />
			<div className="HomePage">
				<div className="column left">
					<OtherLinks />
				</div>
				<div className="column middle">
					<AddPost />
				</div>
				<div className="column right">
					<PopularFeed />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
