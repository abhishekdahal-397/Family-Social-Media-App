import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/user/userSlice";
import "./login.css";
import { automaticLogin } from "../../../features/user/userSlice";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import Cookies from "js-cookie";
const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState(""); // Changed from Password to password
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [seePassword, setSeePassword] = useState(false);
	const id = useSelector((state) => state.user.userId);

	useEffect(() => {
		if (!id) {
			dispatch(automaticLogin()).then((userData) => {
				if (userData && userData.payload && userData.payload.token) {
					navigate("/home");
				}
			});
			console.log("automaticLogin dispatched");
		}
	}, [id, dispatch, navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			if (!email || !password) {
				setLoading(false);
				setErrorMessage("Please provide both email and password.");
				return;
			}

			const userData = await dispatch(loginUser({ email, password }));

			if (userData && userData.payload && userData.payload.token) {
				// Store the token in cookies
				Cookies.set("token", userData.payload.token, { expires: 7 }); // Expires in 7 days

				// Navigate to home page
				navigate("/home");
			} else {
				setErrorMessage("Invalid credentials. Please try again.");
				navigate("/login");
			}
		} catch (error) {
			console.error("Login failed:", error.message);
			setErrorMessage("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleTogglePassword = () => {
		setSeePassword(!seePassword);
	};

	return (
		<div className="fullloginpage">
			<form
				className=" loginform max-w-md mx-auto pt-8 "
				onSubmit={handleLogin}
			>
				<div className=" logininputs mb-4 ">
					<label
						className=" emailpasswordlabel block  text-white text-sm font-bold mb-2"
						htmlFor="email"
					>
						Email:
					</label>
					<input
						className="appearance-none border rounded w-[80%] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-4 logininputs">
					<label
						className=" emailpasswordlabel block text-white text-sm font-bold mb-2"
						htmlFor="password"
					>
						Password:
					</label>
					<input
						type={seePassword ? "text" : "password"}
						className="appearance-none  border rounded w-[80%] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className="visibility" onClick={handleTogglePassword}>
						{seePassword ? <MdVisibility /> : <MdVisibilityOff />}
					</div>
				</div>

				<button
					className="loginbuttom bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
					disabled={loading}
				>
					{loading ? "Logging in..." : "Login"}
				</button>
				{errorMessage && (
					<p className="text-red-500 text-sm mt-2">{errorMessage}</p>
				)}
				<div className=" newhere mt-4">
					New Here?{" "}
					<Link to="/register" className="text-blue-300">
						Register
					</Link>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
