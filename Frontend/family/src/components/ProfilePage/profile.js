import abhishek from "./profileImages/abhishek.jpg";
import "./profile.css";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const UserProfile = () => {
	const username = useSelector((state) => state.user.username);
	const profilePic = useSelector((state) => state.user.userProfileUrl);
	const [selectedFile, setSelectedFile] = useState(null);
	const userId = useSelector((state) => state.user.userId);
	console.log("this is profile url", profilePic);

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};
	const deleteProfilePicture = async () => {
		try {
			const response = await axios.delete(
				`http://localhost:3002/api/posts/deleteProfilePicture/${userId}`
			);
			if (response.okay) {
				console.log("profile picture deleted");
			}
		} catch (error) {
			console.log("ProfilePicture cannot be deleted ");
			console.log(error);
		}
	};
	const userPosts = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3002/api/posts/getUserPosts/${userId}`
			);
			console.log("user posts", response.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		userPosts();
	}, []);

	const handleUploadProfilePicture = async () => {
		try {
			const formData = new FormData();
			formData.append("file", selectedFile);

			const response = await axios.post(
				`http://localhost:3002/api/posts/uploadProfilePicture/${userId}`,
				formData
			);

			console.log("uploaded");

			// Handle the response (e.g., update UI)
		} catch (error) {
			console.log("not uploaded");

			console.error("Error uploading image", error);
			// Handle error (e.g., show error message to the user)
		}
	};
	return (
		<>
			<body className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
				<img
					id="profile"
					className="h-[20vh] rounded-full  w-auto "
					src={profilePic}
				/>
				<p className="text-center font-bold ">
					{username ? username : "undefined"}
				</p>
				<input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="mt-2"
				/>
				<button
					onClick={handleUploadProfilePicture}
					className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
				>
					Upload Profile Picture
				</button>
				<button
					onClick={deleteProfilePicture}
					className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 ease-in"
				>
					Delete Profile Picture
				</button>
				<div></div>
			</body>
		</>
	);
};

export default UserProfile;
