// MidSection.jsclassclass
import "../css/MidSection.css";
import Post from "../../post/post";
import React from "react";
// import { Link } from "react-router-dom";
import Stories from "./stories";
import "../css/MidSection.css";

const MidSection = () => {
	return (
		<div className="MidSection max-w-2xl  overflow-y-scroll">
			<Stories />

			<Post />
		</div>
	);
};

export default MidSection;
