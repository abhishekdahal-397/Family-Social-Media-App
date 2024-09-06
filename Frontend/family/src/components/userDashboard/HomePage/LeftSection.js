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

	const profilePic = useSelector((state) => state.user.profilePicture);
	const userDetails = useSelector((state) => state.user);

	return (
		<div className="LeftSection fixed overflow-y-scroll ">
			<div className="ProfileBox">
				{" "}
				<Link to={`/userProfile/${userId}`}>
					<img
						className="smallImg"
						src={profilePic ? profilePic : defaultProfile}
					/>
				</Link>
				<p className="MyName ml-2">
					{username
						? username[0].toUpperCase() + username.substring(1, username.length)
						: "undefined"}
				</p>
			</div>

			<div className=" mb-2 pl-7   h-11  rounded   ">Friends</div>
			<div className=" mb-2 pl-7 h-11  rounded">Memories</div>
			<div className=" mb-2 pl-7 h-11  rounded">Saved</div>
			<div className=" mb-2 pl-7 h-11  rounded">Groups</div>
			<div className=" mb-2 pl-7 h-11  rounded">Video</div>
			<div className=" mb-2 pl-7 h-11  rounded">Ads Manager</div>
			<div className=" mb-2 pl-7 h-11  rounded">Climate Science Center</div>
			<div className=" mb-2 pl-7 h-11  rounded">Events</div>
			<div className=" mb-2 pl-7 h-11  rounded">Feeds</div>
			<div className=" mb-2 pl-7 h-11  rounded">Fundraisers</div>
			<div className=" mb-2 pl-7 h-11  rounded">Games</div>
			<div className=" mb-2 pl-7 h-11  rounded">MarketPlace</div>
			<div className=" mb-2 pl-7 h-11  rounded">Pages</div>
		</div>
	);
};

export default LeftSection;
