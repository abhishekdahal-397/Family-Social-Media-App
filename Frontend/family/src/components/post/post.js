import React, { useState, useEffect } from "react";
import "./post.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdCommentBank, MdPhotoAlbum } from "react-icons/md";

import Upload from "./uploadSection/upload";
import CommentBox from "../CommentBox/CommentBox";

const Post = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [posts, setPosts] = useState([]);
	const [username, setUsername] = useState(null);
	const userId = useSelector((state) => state.user.userId);
	const [User, setUserData] = useState({});
	const [randomPosts, setRandomPosts] = useState([]);

	const [likedPosts, setLikedPosts] = useState([]);
	const [activeCommentPostId, setActiveCommentPostId] = useState(null);

	const handleLike = async (index, postId) => {
		try {
			setLikedPosts((prev) =>
				prev.includes(postId)
					? prev.filter((id) => id !== postId)
					: [...prev, postId]
			);

			const response = await axios.patch(
				`http://localhost:3002/api/posts/toggleLike/${postId}/${userId}`
			);
			console.log("toggle request sent", response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const toggleCommentBox = (postId) => {
		if (activeCommentPostId === postId) {
			setActiveCommentPostId(null);
		} else {
			setActiveCommentPostId(postId);
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
				const token = localStorage.getItem("token");
				const response = await axios.get(
					`http://localhost:3002/api/users/getUser/${userId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setUserData(response.data);
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
		<div className="post">
			<Upload />

			{randomPosts.map((randPost, index) => (
				<div key={index} className="singlepost">
					<div className="flex items-center relative top-[2.5vw] right-[5px] p-4 rounded-lg">
						<Link to="/UserProfile">
							<div
								style={{ backgroundImage: `url(${randPost.user.profileUrl})` }}
								className="usericon h-9 w-9 mb-2 pt-5 bg-gray-300 rounded-full"
							></div>
						</Link>
						<p className="text-lg h-9 z-1">{randPost.user.username}</p>
					</div>

					<h1 className="relative left-[60px] top-[5px]">#caption</h1>

					<div className="post-photo my-3 h-[80vh] w-[70vh] ml-4">
						<img src={randPost.imageUrl} className="post" alt="post" />
					</div>

					<div className="relative left-[7vw] top-[2px] text-sm flex gap-2 flex-wrap">
						<div
							className="button-like"
							style={{
								backgroundColor: likedPosts.includes(randPost._id)
									? "white"
									: "blue",
							}}
							onClick={() => handleLike(index, randPost._id)}
						>
							like
						</div>

						<div
							onClick={() => toggleCommentBox(randPost._id)}
							className="button-like"
						>
							Comment
						</div>

						<div
							onClick={() => {
								const postLink = `${window.location.origin}/post/${randPost._id}`;
								navigator.clipboard.writeText(postLink);
								alert("Post link copied to clipboard!");
							}}
							className="button-like"
						>
							Share
						</div>

						{activeCommentPostId === randPost._id && (
							<div className="mt-2 w-full">
								<CommentBox postId={randPost._id} />
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default Post;
