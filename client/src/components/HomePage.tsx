import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import NavBar from "./NavBar";
import OtherLinks from "./OtherLinks";
import PopularFeed from "./PopularFeed";
import "../styles/HomePage.scss";

import { useNavigate } from "react-router-dom";

interface Props {}

const HomePage: React.FC<Props> = (props: Props) => {
	const [authorized, setAuthorized] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		(async () => {
			const data = await (
				await fetch(
					process.env.REACT_APP_API_DOMAIN_NAME + "/requireAuth",
					{ credentials: "include" }
				)
			).json();
			console.log(data);
			setAuthorized(data.validCookie);
			if (!data.validCookie) navigate("/login");
		})();
	}, []);
	return (
		<>
			{authorized && (
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
			)}
		</>
	);
};

export default HomePage;
