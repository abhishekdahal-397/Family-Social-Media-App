import React, { useEffect } from "react";
import axios from "axios";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { automaticLogin, logout } from "./features/user/userSlice";
import LoginForm from "./components/authentication/loginpage/login";
import Navbar from "./components/userDashboard/HomePage/Navbar";
import RegisterForm from "./components/authentication/registerpage/register";
import People from "./components/manageFriends/People";
import UserProfile from "./components/ProfilePage/profile";
import HomePage from "./components/userDashboard/HomePage/HomePage";
import { useDispatch } from "react-redux";
import Logout from "./components/authentication/logout/Logout";
import CommentBox from "./components/CommentBox/CommentBox";
function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(automaticLogin());
	}, [dispatch]);

	return (
		<Router>
			<div className="App">
				<Navbar />
				<Routes>
					<Route path="/" element={<Navigate to="/login" />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/register" element={<RegisterForm />} />
					<Route path="/login" element={<LoginForm />}></Route>
					<Route path="/requests" element={<People />}></Route>
					<Route path="/userProfile/:id" element={<UserProfile />}></Route>
					<Route path="/logout" element={<Logout />}></Route>
				</Routes>
			</div>
		</Router>
	);
}
export default App;
