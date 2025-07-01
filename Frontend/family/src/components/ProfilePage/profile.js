import abhishek from "./profileImages/abhishek.jpg";
import "./profile";
import React, { useEffect, useRef, useState } from "react";
import pascal from "../images/rose.jpg";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../../features/Friend/friendsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
	const username = useSelector((state) => state.user.username);
	const profilePic = useSelector((state) => state.user.profilePicture);
	const userId = useSelector((state) => state.user.userId);
	const dispatch = useDispatch();

	const friends = useSelector((state) => state.friends.friends);
	const [userPosts, setUserPosts] = useState([]);
	const fileInputRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [Mates, setMates] = useState([]);

	useEffect(() => {
		dispatch(fetchFriends(userId));
	}, [dispatch, userId]);

	useEffect(() => {
		getUserPosts();
		fetchFriendsList();
	}, []);

	const getUserPosts = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3002/api/posts/getUserPosts/${userId}`
			);
			setUserPosts(response.data);
		} catch (error) {
			console.error("Error fetching user posts:", error);
		}
	};

	const fetchFriendsList = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3002/api/friend-requests/acceptedUserRequests/${userId}`
			);
			setMates(response.data);
		} catch (error) {
			console.error("Error fetching friends:", error);
		}
	};

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleUploadProfilePicture = async () => {
		try {
			const formData = new FormData();
			formData.append("file", selectedFile);

			await axios.post(
				`http://localhost:3002/api/posts/uploadProfilePicture/${userId}`,
				formData
			);
			if (fileInputRef.current) fileInputRef.current.value = "";
			toast.success("Profile picture uploaded successfully");
		} catch (error) {
			toast.error("Error uploading profile picture");
		}
	};
	const deleteProfilePicture = async () => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete the profile picture?"
		);
		if (!confirmDelete) return;

		try {
			await axios.delete(
				`http://localhost:3002/api/posts/deleteProfilePicture/${userId}`
			);
			toast.success("Profile picture deleted");
		} catch (error) {
			toast.error("Error deleting profile picture");
		}
	};

	return (
		<div className="min-h-screen w-full bg-gray-100 flex flex-col items-center">
			{/* Header Section */}
			<div
				className="w-full h-[60vh] bg-cover bg-center flex flex-col justify-center items-center text-white"
				style={{ backgroundImage: `url(${pascal})` }}
			>
				<img
					src={profilePic}
					alt="Profile"
					className="h-[20vh] w-[20vh] object-cover rounded-full shadow-lg border-4 border-white mb-4"
				/>
				<h1 className="text-3xl font-bold mb-2">{username || "Undefined"}</h1>

				<input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="hidden"
					ref={fileInputRef}
					id="fileInput"
				/>

				<div className="flex gap-3">
					<label
						htmlFor="fileInput"
						className="cursor-pointer px-4 py-2 bg-white text-black rounded shadow"
					>
						Select Picture
					</label>
					<button
						onClick={handleUploadProfilePicture}
						className="px-4 py-2 bg-green-600 text-white rounded shadow"
					>
						Upload
					</button>
					<button
						onClick={deleteProfilePicture}
						className="px-4 py-2 bg-red-500 text-white rounded shadow"
					>
						Delete
					</button>
				</div>
			</div>

			{/* Posts and Friends Section */}
			<div className="w-full flex flex-col lg:flex-row justify-between p-8 gap-8">
				{/* User Posts */}
				<div className="w-full lg:w-2/3">
					<h2 className="text-2xl font-semibold mb-4">My Posts</h2>
					{userPosts.map((post, index) => (
						<div key={index} className="bg-white rounded-lg shadow mb-6 p-4">
							<div className="flex items-center mb-2">
								<img
									src={profilePic}
									alt="User"
									className="h-10 w-10 rounded-full mr-3 object-cover"
								/>
								<span className="font-medium text-lg">{username}</span>
							</div>
							<h3 className="text-md text-gray-500 mb-2">#caption</h3>
							<img
								src={post}
								alt="Post"
								className="w-[100%] h-[100%] rounded-lg object-cover"
							/>
							<div className="flex gap-4 mt-4">
								<button className="text-sm px-3 py-1 bg-red-500 text-white rounded">
									Like
								</button>
								<button className="text-sm px-3 py-1 bg-blue-500 text-white rounded">
									Comment
								</button>
								<button className="text-sm px-3 py-1 bg-gray-600 text-white rounded">
									Share
								</button>
							</div>
						</div>
					))}
				</div>

				{/* Friends List */}
				<div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow h-fit">
					<h2 className="text-2xl font-semibold mb-4">My Friends</h2>
					{Mates.map((mate, index) => (
						<div key={index} className="flex items-center mb-4">
							<img
								src={mate.sender.profileUrl}
								alt="Friend"
								className="h-10 w-10 rounded-full object-cover"
							/>
							<span className="ml-3 font-medium">{mate.sender.username}</span>
						</div>
					))}
				</div>
			</div>

			<ToastContainer />
		</div>
	);
};

export default UserProfile;
