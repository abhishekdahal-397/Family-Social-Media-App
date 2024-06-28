import abhishek from "./profileImages/abhishek.jpg";
import "./profile.css";
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const UserProfile = () => {
	const username = useSelector((state) => state.user.username);
	const profilePic = useSelector((state) => state.user.userProfileUrl);
	return (
		<>
			<body className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
				<img
					id="profile"
					className="h-[20vh] rounded-full w-auto "
					src={profilePic}
				/>
				<p className="text-center font-bold ">
					{username ? username : "undefined"}
				</p>
			</body>
		</>
	);
};

export default UserProfile;
