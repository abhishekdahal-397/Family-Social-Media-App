import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MidSection from "./components/userDashboard/MidSection";
import RegisterForm from "./components/registerpage/register";
import LoginForm from "./components/loginpage/login";
import Navbar from "./components/userDashboard/Navbar";
import axios from "axios";
import ManageFriends from "./components/manageFriends/ManageFriends";
import CommentBox from "./components/CommentBox/CommentBox";
import UserProfile from "./components/ProfilePage/profile";
import HomePage from "./components/userDashboard/HomePage";
function App() {
	// async function getUserData(userId) {
	// 	try {
	// 		const response = await axios.get(`/api/users/${userId}`);
	// 		return response.data;
	// 	} catch (error) {
	// 		console.error("Error fetching user data:", error);
	// 		throw error;
	// 	}
	// }
	// // Function to handle successful login and fetch user data
	// const handleLogin = async (userId) => {
	// 	try {
	// 		const userData = await getUserData(userId); // Fetch user data from backend
	// 		setUserData(userData); // Update state with user data
	// 	} catch (error) {
	// 		console.error("Error fetching user data:", error);
	// 	}
	// };

	return (
		<Router>
			<div className="App">
				<Navbar />
				<Routes>
					<Route path="/dashboard" element={<HomePage />} />
					<Route path="/register" element={<RegisterForm />} />
					<Route path="/" element={<LoginForm />} />

					<Route path="/requests" element={<ManageFriends />}></Route>
					<Route path="/userProfile/:id" element={<UserProfile />}></Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
