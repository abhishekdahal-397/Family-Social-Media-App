import abhishek from "./profileImages/abhishek.jpg";
import "./profile";
import React, { useEffect, useRef, useState } from "react";
import pascal from "../images/rose.jpg";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfile = () => {
	const username = useSelector((state) => state.user.username);
	const profilePic = useSelector((state) => state.user.userProfileUrl);
	const [selectedFile, setSelectedFile] = useState(null);
	const userId = useSelector((state) => state.user.userId);
	const [userPosts, setUserPosts] = useState([]);
	const fileInputRef = useRef(null); // Add a ref for the file input

	console.log("this is profile url", profilePic);
	console.log("this is userPosts", userPosts);
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
	const getUserPosts = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3002/api/posts/getUserPosts/${userId}`
			);

			setUserPosts(response.data);

			console.log("first userpost", userPosts[0]);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getUserPosts();
	}, []);

	const handleUploadProfilePicture = async () => {
		try {
			const formData = new FormData();
			formData.append("file", selectedFile);

			const response = await axios.post(
				`http://localhost:3002/api/posts/uploadProfilePicture/${userId}`,
				formData
			);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
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
			<body className="w-[100vw]  flex flex-col justify-center items-center">
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
					ref={fileInputRef}
				/>
				<button
					onClick={handleUploadProfilePicture}
					className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
				>
					Upload Profile Picture
				</button>
				<button
					onClick={deleteProfilePicture}
					className="mt-2 px-4 py-2 text-white rounded hover:bg-blue-400 ease-in"
				>
					Delete Profile Picture
				</button>

				<div className=" w-full flex   mt-[10vh]  ">
					<div>
						{userPosts.map((post, index) => (
							<div className="posts" key={index}>
								<div className="singlepost mt-4 ml-10 pb-6 w-[40vw]">
									<div className="">
										<div className="flex  items-center relative top-[2.5vw] right-[5px] p-4  rounded-lg">
											<Link>
												<div
													style={{ backgroundImage: `url(${profilePic})` }}
													className="usericon  h-9 w-9 mb-2 pt-5 bg-gray-300 rounded-full"
												></div>
											</Link>
											<p className="text-lg  h-9 z-1">{username}</p>
										</div>
									</div>
									<h1 className="relative left-[60px] top-[5px] ">#caption</h1>
									<div className="post-photo my-3   h-[80vh] w-[70vh] ml-4">
										<img src={userPosts[index]} className="post" alt="post" />
									</div>
									<div
										className="relative
          left-[7vw]
          top-[2px]
        text-sm"
									>
										<div
											className="button-like"
											style={{ backgroundColor: "red" }}
										>
											like
										</div>
										<div className="button-like">Comment</div>

										<div className="button-like">Share</div>
									</div>{" "}
								</div>
							</div>
						))}
					</div>
					<div className=" friends h-[20vh] w-[40vw] bg-red-400 "> friends</div>
				</div>
			</body>
		</>
	);
};

export default UserProfile;
