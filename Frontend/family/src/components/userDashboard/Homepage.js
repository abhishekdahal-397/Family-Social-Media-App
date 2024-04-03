// HomePage.jsclassclass
import "./homepage.css";
import Post from "./post";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Post />
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
      </Link>
    </div>
  );
};

export default HomePage;
