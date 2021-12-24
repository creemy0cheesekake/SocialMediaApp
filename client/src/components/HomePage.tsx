import React from "react";
import NavBar from "./NavBar";

interface Props {}

const HomePage: React.FC<Props> = (props: Props) => {
	return (
		<div>
			<NavBar />
			<h1>hi</h1>
			<p>hello</p>
		</div>
	);
};

export default HomePage;
