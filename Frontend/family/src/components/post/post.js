import React, { useState, useEffect } from "react";
import "./post.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ball from "../images/ball.png";

import { MdCommentBank, MdPhotoAlbum } from "react-icons/md";

import Upload from "./uploadSection/upload";
// import Navbar from "./Navbar";
const Post = () => {
	const [likeColor, setLikeColor] = useState("white");
	const [selectedFile, setSelectedFile] = useState(null);
	const [posts, setPosts] = useState([]);
	const [username, setUsername] = useState(null);
	const userId = useSelector((state) => state.user.userId);
	const [User, setUserData] = useState({});
	const [commentBox, setShowCommentBox] = useState(false);
	const [randomPosts, setRandomPosts] = useState([]);
	const [canScroll, setCanscroll] = useState(true);

	const handleLike = async (index, postId) => {
		try {
			const response = await axios.patch(
				`http://localhost:3002/api/posts/likepost`,
				{ postId, userId }
			);

			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!canScroll) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}
	}, [canScroll]);
	const toggleCommentBox = (index) => {
		// setShowCommentBox((prev) => !prev);
		// commentBox === true
		// 	? console.log("cmtbox shown")
		// 	: console.log("cmtbox hidden");
		// setCanscroll(!commentBox);
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
		const getRandomPostsFromFriends = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3002/api/posts/getRandomFriendPosts/${userId}`
				);

				setRandomPosts(response.data);
			} catch (err) {
				console.error(err);
			}
		};
		if (userId) {
			getRandomPostsFromFriends();
		}
	}, [userId]);
	useEffect(() => {
		setUsername(User.username);
	}, [User]);

	return (
		<div className=" post  ">
			<Upload />

			{randomPosts.map((randPost, index) => {
				return (
					<div key={index} className="singlepost">
						<div className="">
							<div className="flex  items-center relative top-[2.5vw] right-[5px] p-4  rounded-lg">
								<Link to="/UserProfile">
									<div
										style={{
											backgroundImage: `url(${randPost.user.profileUrl})`,
										}}
										className="usericon h-9 w-9 mb-2 pt-5 bg-gray-300 rounded-full"
									></div>
								</Link>
								<p className="text-lg  h-9 z-1">{randPost.user.username}</p>
							</div>
						</div>
						<h1 className="relative left-[60px] top-[5px] ">#caption</h1>
						<div className="post-photo my-3   h-[80vh] w-[70vh] ml-4">
							<img src={randPost.imageUrl} className="post" alt="post" />
						</div>
						<div className="relative  left-[7vw]  top-[2px] text-sm">
							<div
								className="button-like"
								style={{ backgroundColor: `${likeColor}` }}
								onClick={handleLike(index, randPost._id)}
							>
								like
							</div>
							<div onClick={toggleCommentBox} className="button-like">
								Comment
							</div>

							<div className="button-like">Share</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Post;
