import React, { useState } from "react";
import axios from "axios";
import { Link, redirect } from "react-router-dom";
import "./register.css";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const registrationSchema = z
	.object({
		username: z
			.string()
			.min(1, "Username is required")
			.refine((value) => value.trim().split(" ").length === 2, {
				message: "Username must contain both firstname and lastname",
			}),
		email: z.string().email("Invalid email address"),
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z.string().min(1, "Confirm password is required"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"],
	});

const capitalizeUsername = (username) => {
	return username
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
};

const RegisterForm = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});

	const handleRegister = async (e) => {
		e.preventDefault();

		// Capitalize the username before validation
		const formattedUsername = capitalizeUsername(username);

		// Validate form data using Zod
		const result = registrationSchema.safeParse({
			username: formattedUsername,
			email,
			password,
			confirmPassword,
		});

		if (!result.success) {
			// Format errors to be displayed in the form
			const formattedErrors = result.error.format();
			setErrors(formattedErrors);

			// Display toasts for each error
			Object.values(formattedErrors)
				.flat()
				.forEach((error) => {
					if (error._errors) {
						error._errors.forEach((errMsg) => toast.error(errMsg));
					}
				});
			console.log("returned");
			return;
		}

		try {
			const response = await axios.post(
				"http://localhost:3002/api/users/register",
				{
					username: formattedUsername,
					email,
					password,
					confirmPassword,
				},
				{ timeout: 5000 }
			);
			console.log("respnse", response);

			if (response && response.data && response.data.token) {
				localStorage.setItem("token", response.data.token);
				const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day
				localStorage.setItem("tokenExpiration", expirationTime);

				setEmail("");
				setPassword("");
				setUsername("");
				setConfirmPassword("");
				toast.success("Registration successful");

				// Redirect or perform other actions as needed
				navigate("/login");
			} else {
				console.error("Unexpected response format", response);
			}
		} catch (error) {
			if (error.response && error.response.data && error.response.data.error) {
				toast.error(`Registration failed: ${error.response.data.error}`);
			} else {
				console.log("error", error);
				toast.error("Unexpected error occurred");
			}
		}
	};

	return (
		<form className="regForm" onSubmit={handleRegister}>
			<div>
				<div className="regusername">
					<label htmlFor="username">Username :</label>
					<input
						placeholder="First and Last Name"
						className="inpregusername"
						id="username"
						type="text"
						value={username}
						onChange={(e) => setUsername(capitalizeUsername(e.target.value))}
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
			<ToastContainer />
		</form>
	);
};

export default RegisterForm;
