// MidSection.jsclassclass
import "../css/MidSection.css";
import Post from "./post";
import React from "react";
// import { Link } from "react-router-dom";
import Stories from "./stories";
import "../css/MidSection.css";

const MidSection = () => {
	return (
		<div className="MidSection max-w-2xl">
			<Stories />

			<Post />
		</div>
	);
};

export default MidSection;
