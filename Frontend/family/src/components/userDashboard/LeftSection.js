import abhishek from "./abhishek.jpg";
import "./LeftSection.css";
import { Link } from "react-router-dom";
import UserProfile from "../ProfilePage/profile";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

const LeftSection = () => {
	const { userId } = useSelector((state) => state.user);
	const [username, setUsername] = useState("");
	const [profilePic, setProfilePic] = useState("");

	axios
		.get(` http://localhost:3001/api/users/getUser/${userId}`)
		.then((response) => {
			// Handle successful response
			console.log("Data received from backend:", response.data);
			setUsername(response.data.user.username);
			setProfilePic(response.data.user.ProfileUrl);
			console.log(profilePic);
		})
		.catch(
			(error) => {
				// Handle error
				console.error("Error fetching data from backend:", error);
			},
			[userId]
		);

	return (
		<div className="LeftSection">
			<div className="ProfileBox">
				{" "}
				<Link to="../UserProfile/id">
					<img className="smallImg" src={profilePic} />
				</Link>
				<p className="MyName">{username}</p>
			</div>
		</div>
	);
};

export default LeftSection;
