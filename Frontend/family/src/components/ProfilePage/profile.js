import abhishek from "./profileImages/abhishek.jpg";
import "./profile.css";
import React from "react";
import { useParams } from "react-router-dom";
const UserProfile = () => {
	const { userId } = useParams();
	return (
		<>
			<img id="profile" src={abhishek} />
			<p>Abhishek Dahal</p>
		</>
	);
};

export default UserProfile;
