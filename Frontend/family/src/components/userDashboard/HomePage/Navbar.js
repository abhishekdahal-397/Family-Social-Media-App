import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import "../css/Navbar.css";
import Logo from "../images/familyLogo.png";
import { ImHome3 } from "react-icons/im";
import { IoNotificationsSharp } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import gsap from "gsap";

import { IoReorderThreeSharp } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { CgMenuGridR } from "react-icons/cg";
import { FaFacebookMessenger } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/user/userSlice";

const Navbar = () => {
	const [showOptions, setShowOptions] = useState(false);
	const optionsRef = useRef(null);
	const dispatch = useDispatch();

	const buttonClick = () => {
		setShowOptions((prevShowOptions) => !prevShowOptions);
	};

	useEffect(() => {
		if (showOptions) {
			gsap.from(optionsRef.current, {
				duration: 1,
				y: -50,
				opacity: 0,
			});
		}
	}, [showOptions]);

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
	const handleLogOut = async () => {
		dispatch(logout);
	};
	return (
		<>
			<nav className="navbar">
				<Link to="/home">
					<img src={Logo} className="appicon" alt="logo " />
				</Link>
				<input className="search" placeholder="search family"></input>
				<div className="navicons">
					<Link to="/home" className="relative left-[50px]">
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
					<CgMenuGridR className="m-4 relative bottom-[9px] right-[9px]" />
					<FaFacebookMessenger className="m-4 relative bottom-[9px] right-[9px]" />
					<IoNotifications className="m-4 relative bottom-[9px] right-[9px]" />
				</div>
			</nav>

			{showOptions && (
				<div
					className="bg-blue-200 rounded h-[auto] w-[30vh] fixed right-[33vw] flex flex-col z-50"
					ref={optionsRef}
				>
					<Link
						className="bg-red-300 h-9  mx-2 w-[27vh] px-[3.9vw] my-4  py-2 rounded  "
						to="/UserProfile/id"
					>
						Profile
					</Link>
					<button className="bg-red-300 h-9 w-auto mx-2 my-4 px-3 py-2 rounded">
						Friends
					</button>
					<button className="bg-red-300 h-9 w-auto mx-2 my-4 px-3 py-2 rounded">
						Settings
					</button>

					<Link
						className="bg-red-300 h-9  mx-2 w-[27vh] px-[3.9vw] my-4  py-2 rounded  "
						to="/register"
					>
						SignUp
					</Link>
					<Link to="/logout">
						<button
							onClick={handleLogOut}
							className="bg-red-300 h-9 w-[27vh] mx-2 my-4 px-3 py-2 rounded "
						>
							Logout
						</button>
					</Link>
				</div>
			)}
		</>
	);
};

export default Navbar;
