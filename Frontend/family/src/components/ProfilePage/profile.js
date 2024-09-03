import abhishek from "./profileImages/abhishek.jpg";
import "./profile";
import React, { useEffect, useRef, useState } from "react";
import pascal from "../images/rose.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends, clearFriends } from "../../features/Friend/friendsSlice";
import { FaUpload } from "react-icons/fa"; // Importing a Font Awesome upload icon
import { CgProfile } from "react-icons/cg";
const UserProfile = () => {
	const username = useSelector((state) => state.user.username);
	const profilePic = useSelector((state) => state.user.profilePicture);
	const [selectedFile, setSelectedFile] = useState(null);
	const userId = useSelector((state) => state.user.userId);
	const dispatch = useDispatch();

	const friends = useSelector((state) => state.friends.friends);
	console.log("my frineds are ", friends);

	const [userPosts, setUserPosts] = useState([]);
	const fileInputRef = useRef(null); // Add a ref for the file input
	const [Mates, setMates] = useState([]);

	console.log("this is profile url", profilePic);
	console.log("this is userPosts", userPosts);
	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};
	useEffect(() => {
		dispatch(fetchFriends(userId));
	}, [dispatch, userId]);

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
			console.log("error getting user Posts", error);
		}
	};
	const Friends = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3002/api/friend-requests/acceptedUserRequests/${userId}`
			);
			console.log("all friends", response.data);
			setMates(response.data);
		} catch (error) {
			console.log("error getting friends", error);
		}
	};
	useEffect(() => {
		getUserPosts();
	}, []);
	useEffect(() => {
		Friends();
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
				<div
					style={{ backgroundImage: `url(${pascal})` }}
					className="color pink bg-sky-400 w-full bg-no-repeat bg-cover h-[60vh] flex justify-center items-center flex-col"
				>
					<img
						id="profile"
						className="h-[20vh] rounded-full w-auto mb-5"
						src={profilePic}
						alt="Profile"
					/>
					<p className="text-center text-3xl text-white font-bold">
						{username ? username : "undefined"}
					</p>
					{/* Hidden file input */}
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						className="hidden"
						ref={fileInputRef}
						id="fileInput"
					/>
					{/* Label styled as a button with an icon */}
					<label
						htmlFor="fileInput"
						className="mt-2 flex items-center justify-center cursor-pointer "
					>
						<div className=" flex mt-2 w-[14vw] whitespace-nowrap px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-400">
							<span className="ml-2">Select Profile Picture</span>
						</div>
					</label>

					<button
						onClick={handleUploadProfilePicture}
						className="mt-2 w-[14vw] px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-400"
					>
						Upload
					</button>
					<button
						onClick={deleteProfilePicture}
						className="mt-2 px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-400 ease-in"
					>
						Delete Profile Picture
					</button>
				</div>
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
										<img src={post} className="post" alt="post" />
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
					<div className="mx-2 friends  w-[50vw] bg-slate-400 overflow-y-scroll p-6 rounded h-[20vw]">
						<h1 className="text-[2vw] text-black pl-6">My Friends</h1>
						{Mates.map((mate, index) => (
							<div className="flex mt-2  " key={index}>
								<img
									className="h-[10vh]  rounded-full  "
									src={mate.sender.profileUrl}
								></img>
								<span className="self-center ml-[1vw]">
									{mate.sender.username}
								</span>
							</div>
						))}
					</div>
				</div>
			</body>
		</>
	);
};

export default UserProfile;
