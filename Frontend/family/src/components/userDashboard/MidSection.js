// MidSection.jsclassclass
import "./MidSection.css";
import Post from "./post";
import Navbar from "./Navbar";
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Stories from "./stories";
import "./MidSection.css";

const MidSection = () => {
	return (
		<div className="MidSection max-w-2xl  ">
			{/* <Post />
      <div></div>
      <Link to="/login">
        {" "}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Login
        </button>
      </Link>
      <Link to="/register">
        {" "}
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Register
        </button>
      </Link> */}

			<Stories />

			<Post />
		</div>
	);
};

export default MidSection;