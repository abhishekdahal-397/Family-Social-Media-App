import React, { useState, useEffect } from "react";
import "./post.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Navbar from "./Navbar";
const Post = () => {
  const [likeColor, setLikeColor] = useState("white");
  const [selectedFile, setSelectedFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState(null);
  const userId = useSelector((state) => state.user.userId);
  const [User, setUserData] = useState({});
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

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://localhost:3001/api/posts/upload",
        formData
      );

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
          "http://localhost:3001/api/posts/getposts"
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
          `http://localhost:3001/api/users/getUser/${userId}`
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
    <div className=" post relative left-[20vw]">
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button
        onClick={handleUpload}
        className="rounded  bg-green-300 h-[40px] w-[60px]"
      >
        Upload
      </button>
      <div>
        <div>
          <div className="flex h-3 items-center  p-4 bg-white rounded-lg">
            <Link to="/UserProfile">
              <div className="usericon h-7 w-7 bg-gray-300 rounded-full"></div>
            </Link>
            {User ? (
              <p className="text-lg   z-1 font-semibold relative top-1">
                {User.username}
              </p>
            ) : (
              <p className="text-lg   z-1 font-semibold relative top-1">
                hello
              </p>
            )}
          </div>
        </div>
        <h1 className="relative left-[60px] top-[5px] ">#caption</h1>
        <div className="post-photo my-3  bg-red-200 h-[80vh] w-[70vh] ml-4">
          {posts.length > 0 && (
            <img src={posts[0].imageUrl} className="post" alt="post" />
          )}
        </div>
        <div
          className="ml-auto 
        text-sm"
        >
          <div
            className="button-like"
            style={{ backgroundColor: `${likeColor}` }}
            onClick={handleLikeColor}
          >
            like
          </div>
          <div className="button-like">Comment</div>
          <div className="button-like">Share</div>
        </div>
        <div className="mt-4 w-full border-t pt-4">
          <div className="comments"></div>
        </div>
      </div>
    </div>
  );
};

export default Post;
