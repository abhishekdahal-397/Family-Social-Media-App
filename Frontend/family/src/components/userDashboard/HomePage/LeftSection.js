import "../css/LeftSection.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import defaultProfile from "../images/default.png";

const LeftSection = () => {
	const { userId } = useSelector((state) => state.user);
	console.log(" userid is ", userId);
	const username = useSelector((state) => state.user.username);
	console.log(username);

	const profilePic = useSelector((state) => state.user.userProfileUrl);
	const userDetails = useSelector((state) => state.user);

	return (
		<div className="LeftSection fixed overflow-y-scroll ">
			<div className="ProfileBox">
				{" "}
				<Link to="../UserProfile/id">
					<img
						className="smallImg"
						src={profilePic ? profilePic : defaultProfile}
					/>
				</Link>
				<p className="MyName">{username ? username : "undefined"}</p>
			</div>
		</div>
	);
};

export default LeftSection;
