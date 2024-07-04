import React from "react";
import axios from "axios";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import LoginForm from "./components/loginpage/login";

import Navbar from "./components/userDashboard/HomePage/Navbar";
import RegisterForm from "./components/registerpage/register";
import ManageFriends from "./components/manageFriends/ManageFriends";
import UserProfile from "./components/ProfilePage/profile";
import HomePage from "./components/userDashboard/HomePage/HomePage";

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
					<Route path="/" element={<Navigate to="/login" />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/register" element={<RegisterForm />} />
					<Route path="/login" element={<LoginForm />}></Route>

					<Route path="/requests" element={<ManageFriends />}></Route>
					<Route path="/userProfile/:id" element={<UserProfile />}></Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
