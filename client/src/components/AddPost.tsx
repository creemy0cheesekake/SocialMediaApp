import React, { useState } from "react";
import "../styles/AddPost.scss";

interface Props {}

const AddPost: React.FC<Props> = (props: Props) => {
	const MAX_HEIGHT_OF_TEXTAREA = 600;
	const [addPostVal, setAddPostVal] = useState("");

	const handleTypePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setAddPostVal(e.target.value);
		e.target.style.height = "0";
		e.target.style.height =
			e.target.scrollHeight < MAX_HEIGHT_OF_TEXTAREA
				? `calc(${e.target.scrollHeight}px + .5em)`
				: `${MAX_HEIGHT_OF_TEXTAREA}px`;
	};

	return (
		<div className="AddPost row">
			<img src="https://picsum.photos/200" alt="pfp" />
			<textarea
				value={addPostVal}
				placeholder="Say something..."
				onChange={handleTypePost}
			/>
			<button onClick={() => setAddPostVal("")}>Send</button>
		</div>
	);
};

export default AddPost;
