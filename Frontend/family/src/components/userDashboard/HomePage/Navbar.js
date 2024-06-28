// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import "../css/Navbar.css";
import { useEffect } from "react";
import Logo from "../images/familyLogo.png";
import { ImHome3 } from "react-icons/im";
import { IoNotificationsSharp } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { IoReorderThreeSharp } from "react-icons/io5";
import { useRef } from "react";
import { MdPeopleAlt } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { BsMenuButton } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";
import { FaFacebookMessenger } from "react-icons/fa6";
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
			<nav className="navbar">
				<Link to="/dashboard">
					<img src={Logo} className="appicon" alt="logo " />
				</Link>{" "}
				<input className="search" placeholder="search family"></input>
				<div className="navicons">
					<Link to="/dashboard" className="relative left-[50px]">
						<ImHome3 />
					</Link>
					<Link to="/notifications"></Link>
					<Link to="/requests">
						<MdPeopleAlt />
					</Link>
					<Link to="/messages">
						<RiMessage2Fill />
					</Link>
					<button onClick={buttonClick}>
						<IoReorderThreeSharp />
					</button>
				</div>
				<div className="navleft">
					{" "}
					<div>
						{" "}
						<CgMenuGridR
							className="m-4
            relative
            bottom-[9px] right-[9px]"
						/>
					</div>
					<div>
						<FaFacebookMessenger
							className="m-4
            relative
            bottom-[9px] right-[9px]"
						/>
					</div>
					<div>
						<IoNotifications
							className="m-4
            relative
            bottom-[9px] right-[9px]"
						/>
					</div>
				</div>
			</nav>

			{showOptions && (
				<div ref={optionsRef}>
					<button>Your Profile</button>
					<button>Friends</button>
					<button>Settings</button>
					<Link to="/login">
						{" "}
						<BsMenuButton>Login</BsMenuButton>
					</Link>
					<Link to="/register">
						{" "}
						<button>Signup</button>
					</Link>

					<button>Logout</button>
				</div>
			)}
		</>
	);
};

export default Navbar;
