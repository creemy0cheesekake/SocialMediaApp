import React from "react";
import AddPost from "./AddPost";
import NavBar from "./NavBar";
import OtherLinks from "./OtherLinks";
import PopularFeed from "./PopularFeed";
import "../styles/HomePage.scss";

interface Props {}

const HomePage: React.FC<Props> = (props: Props) => {
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
