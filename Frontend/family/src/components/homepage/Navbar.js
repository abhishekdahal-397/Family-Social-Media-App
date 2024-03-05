// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import "./Navbar.css";
import { useEffect } from "react";
import { useRef } from "react";
const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [btnCount, setbtnCount] = useState(1);
  const optionsRef = useRef(null);
  const buttonClick = () => {
    btnCount % 2 === 0 ? setShowOptions(true) : setShowOptions(false);
    setbtnCount(btnCount + 1);
    if (setShowOptions) {
      console.log(window);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);
  return (
    <>
      <nav className="bg-green-300 p-4">
        <div className="container h-1 mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-sm font-semibold">
            Family Logo
          </Link>

          <div className="space-x-4">
            <Link to="/" className="text-white text-sm hover:text-gray-300">
              Home
            </Link>
            <Link
              to="/notifications"
              className="text-white text-sm hover:text-gray-300"
            >
              notifications
            </Link>
            <Link
              to="/requests"
              className="text-white text-sm hover:text-gray-300"
            >
              requests
            </Link>
            <Link
              to="/messages"
              className="text-white text-sm hover:text-gray-300"
            >
              messages
            </Link>
            <button className="options text-white" onClick={buttonClick}>
              options
            </button>
          </div>
        </div>
      </nav>

      {showOptions && (
        <div ref={optionsRef} className="option-container">
          <button className="hover:bg-blue-700 text-white  rounded">
            Your Profile
          </button>
          <button className="hover:bg-blue-700 text-white  rounded">
            Friends
          </button>
          <button className="hover:bg-blue-700 text-white rounded">
            Settings
          </button>
          <Link to="/login">
            {" "}
            <button className="hover:bg-blue-700 text-white  rounded">
              Login
            </button>
          </Link>
          <Link to="/register">
            {" "}
            <button className="hover:bg-blue-700 text-white  rounded">
              Signup
            </button>
          </Link>

          <button className="hover:bg-blue-700 text-white rounded">
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
