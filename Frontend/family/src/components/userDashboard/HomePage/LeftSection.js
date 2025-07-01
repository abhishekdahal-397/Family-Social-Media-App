import "../css/LeftSection.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import defaultProfile from "../images/default.png";

const LeftSection = () => {
	const { userId } = useSelector((state) => state.user);
	console.log(" userid from leftSection is ", userId);
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

			<div className="  pl-7   h-11  cursor-pointer hover:bg-slate-200 flex items-center rounded   ">
				Friends
			</div>
			<div className="  pl-7 h-11 cursor-pointer hover:bg-slate-200 flex items-center rounded">
				Memories
			</div>
			<div className="  pl-7 h-11 cursor-pointer hover:bg-slate-200 flex items-center rounded">
				Saved
			</div>
			<div className="  pl-7 h-11 cursor-pointer hover:bg-slate-200 flex items-center rounded">
				Groups
			</div>
			<div className="  pl-7 h-11 cursor-pointer hover:bg-slate-200 flex items-center rounded">
				Video
			</div>
			<div className="  pl-7 h-11 cursor-pointer hover:bg-slate-200 flex items-center rounded">
				Ads Manager
			</div>
			<div className="  pl-7 h-11 cursor-pointer hover:bg-slate-200 flex items-center rounded">
				Climate Science Center
			</div>
			<div className="  pl-7 h-11 cursor-pointer hover:bg-slate-200 flex items-center rounded">
				Events
			</div>
			<div className="  pl-7 h-11 cursor-pointer hover:bg-slate-200 flex items-center rounded">
				Feeds
			</div>
			<div className="  pl-7 h-11 cursor-pointer hover:bg-slate-200 flex items-center rounded">
				Fundraisers
			</div>
			<div className="  pl-7 h-11 cursor-pointer hover:bg-slate-200 flex items-center rounded">
				Games
			</div>
			<div className="  pl-7 h-11 cursor-pointer hover:bg-slate-200 flex items-center rounded">
				MarketPlace
			</div>
			<div className="  pl-7 h-11 cursor-pointer hover:bg-slate-200 flex items-center rounded">
				Pages
			</div>
		</div>
	);
};

export default LeftSection;
