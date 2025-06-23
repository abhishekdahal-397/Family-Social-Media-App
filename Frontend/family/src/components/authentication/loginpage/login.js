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

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true); // ✅ start loading
		setErrorMessage(""); // ✅ clear old error

		if (!email || !password) {
			setErrorMessage("Please provide both email and password.");
			setLoading(false); // ✅ stop loading if validation fails
			return;
		}

		try {
			const result = await dispatch(loginUser({ email, password })); // ✅ wait for login to complete

			if (result.payload && result.payload.token) {
				Cookies.set("token", result.payload.token, { expires: 7 });
				navigate("/home"); // ✅ success
			} else {
				setErrorMessage("Invalid credentials. Please try again."); // ✅ failure
			}
		} catch (error) {
			console.error("Login failed:", error);
			setErrorMessage("An error occurred. Please try again."); // ✅ catch unexpected errors
		} finally {
			setLoading(false); // ✅ ALWAYS stop loading after try/catch
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
					<div className="relative mb-4 ">
						<input
							type={seePassword ? "text" : "password"}
							className="appearance-none  border rounded w-[80%] pr-8 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div
							className="visibility absolute right-[3vw] top-[2vh] cursor-pointer"
							onClick={handleTogglePassword}
						>
							{seePassword ? <MdVisibility /> : <MdVisibilityOff />}
						</div>
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
