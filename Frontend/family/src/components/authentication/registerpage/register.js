import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./register.css";

const RegisterForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:3002/api/users/register",
				{
					username,
					email,
					password,
				},
				{ timeout: 5000 }
			);

			// Check if 'response' and 'response.data' exist before accessing 'data.token'
			if (response && response.data && response.data.token) {
				// Save the token and its expiration time in localStorage or sessionStorage
				localStorage.setItem("token", response.data.token);
				const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day
				localStorage.setItem("tokenExpiration", expirationTime);

				setEmail("");
				setPassword("");
				setUsername("");
				setConfirmPassword("");

				// Redirect or perform other actions as needed
			} else {
				console.error("Unexpected response format", response);
				// Handle unexpected response format
			}
		} catch (error) {
			// Check if 'error.response' and 'error.response.data' exist before accessing 'data.error'
			if (error.response && error.response.data && error.response.data.error) {
				console.error("Registration failed:", error.response.data.error);
				// Handle registration error (e.g., display error message to the user)
			} else {
				console.error("Unexpected error format", error);
				// Handle unexpected error format
			}
		}
	};

	return (
		<form className="regForm" onSubmit={handleRegister}>
			<div>
				<div className="regusername">
					<label htmlFor="username">Username :</label>
					<input
						placeholder="username"
						className="inpregusername"
						id="username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="regemail">
					<label htmlFor="email">Email :</label>
					<input
						placeholder="email"
						className="inpregemail"
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="regpassword">
					<label htmlFor="password">Password :</label>
					<input
						placeholder="password"
						className="inpregpassword"
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="regconfirm">
					<label htmlFor="confirm_password">Confirm Password :</label>
					<input
						placeholder="confirm"
						className="inpregconfirm"
						id="confirm_password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<button className="submitbtn" type="submit">
					Register
				</button>
				<div className="alreadyhere">
					Already here?{" "}
					<Link style={{ color: "skyblue" }} to="/login">
						Login
					</Link>
				</div>
			</div>
		</form>
	);
};

export default RegisterForm;
