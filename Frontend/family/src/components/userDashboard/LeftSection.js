import abhishek from "./abhishek.jpg";
import "./LeftSection.css";
import { Link } from "react-router-dom";
import UserProfile from "../ProfilePage/profile";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

const LeftSection = () => {
	const { userId } = useSelector((state) => state.user);
	console.log(" userid is ", userId);
	const username = useSelector((state) => state.user.username);
	console.log(username);

	const profilePic = useSelector((state) => state.user.userProfileUrl);
	const userDetails = useSelector((state) => state);
	console.log(userDetails);

	return (
		<div className="LeftSection">
			<div className="ProfileBox">
				{" "}
				<Link to="../UserProfile/id">
					<img className="smallImg" src={profilePic} />
				</Link>
				<p className="MyName">{username ? username : "undefined"}</p>
			</div>
		</div>
	);
};

export default LeftSection;
