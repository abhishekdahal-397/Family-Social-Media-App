import React, { useState, useEffect } from "react";
import "./post.css";

import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import pascal from "../images/rose.jpg";

import unsplash2 from "../images/rose.jpg";
import { MdCommentBank, MdPhotoAlbum } from "react-icons/md";
import CommentBox from "../CommentBox/CommentBox";
// import Navbar from "./Navbar";
const Post = () => {
	const [likeColor, setLikeColor] = useState("white");
	const [selectedFile, setSelectedFile] = useState(null);
	const [posts, setPosts] = useState([]);
	const [username, setUsername] = useState(null);
	const userId = useSelector((state) => state.user.userId);
	const [User, setUserData] = useState({});
	const [commentBox, setShowCommentBox] = useState(false);

	const handleLikeColor = () => {
		if (likeColor === "white") {
			setLikeColor("#3b82f6");
		} else {
			setLikeColor("white");
		}
	};

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const toggleCommentBox = () => {
		setShowCommentBox((prev) => !prev);
		commentBox === true
			? console.log("cmtbox shown")
			: console.log("cmtbox hidden");
	};

	const handleUpload = async () => {
		console.log("upload button clicked");

		try {
			const formData = new FormData();
			formData.append("file", selectedFile);

			const response = await axios.post(
				`http://localhost:3002/api/posts/upload/${userId}`,
				formData
			);
			console.log(response);

			console.log("uploaded");

			// Handle the response (e.g., update UI)
		} catch (error) {
			console.error("Error uploading image", error);
			// Handle error (e.g., show error message to the user)
		}
	};

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3002/api/posts/getposts"
				);

				setPosts(response.data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchPosts();
	}, []);
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3002/api/users/getUser/${userId}`
				);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		if (userId) {
			fetchUserData();
		}
	}, [userId]);
	useEffect(() => {
		setUsername(User.username);
	}, [User]);

	return (
		<div className=" post ">
			<input className="input " type="file" onChange={handleFileChange} />
			<button
				onClick={handleUpload}
				className="rounded uploadbtn h-[40px] w-[60px]"
			>
				Upload
			</button>
			<div className="singlepost">
				<div className="">
					<div className="flex  items-center relative top-[2.5vw] right-[5px] p-4  rounded-lg">
						<Link to="/UserProfile">
							<div className="usericon h-9 w-9 mb-2 pt-5 bg-gray-300 rounded-full"></div>
						</Link>
						<p className="text-lg  h-9 z-1">Abhishek Dahal</p>
					</div>
				</div>
				<h1 className="relative left-[60px] top-[5px] ">#caption</h1>
				<div className="post-photo my-3   h-[80vh] w-[70vh] ml-4">
					<img src={pascal} className="post" alt="post" />
				</div>
				<div
					className="relative
          left-[7vw]
          top-[2px]
        text-sm"
				>
					<div
						className="button-like"
						style={{ backgroundColor: `${likeColor}` }}
						onClick={handleLikeColor}
					>
						like
					</div>
					<div onClick={toggleCommentBox} className="button-like">
						Comment
					</div>

					<div className="button-like">Share</div>
				</div>{" "}
				{commentBox && <CommentBox />}
			</div>
		</div>
	);
};

export default Post;
