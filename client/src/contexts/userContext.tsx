import React, { createContext, useState } from "react";

const UserContext: React.Context<{}> = createContext({});

interface Props {
	children: React.ReactElement;
}

const UserContextProvider: React.FC<Props> = (props: Props) => {
	const contextValue = {};
	return (
		<UserContext.Provider value={contextValue}>
			{props.children}
		</UserContext.Provider>
	);
};
