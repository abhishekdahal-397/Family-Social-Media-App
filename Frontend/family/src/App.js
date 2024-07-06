import React, { useEffect } from "react";
import axios from "axios";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { automaticLogin } from "./features/user/userSlice";

import LoginForm from "./components/loginpage/login";

import Navbar from "./components/userDashboard/HomePage/Navbar";
import RegisterForm from "./components/registerpage/register";
import ManageFriends from "./components/manageFriends/ManageFriends";
import UserProfile from "./components/ProfilePage/profile";
import HomePage from "./components/userDashboard/HomePage/HomePage";
import { useDispatch } from "react-redux";

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

					<Route path="/requests" element={<ManageFriends />}></Route>
					<Route path="/userProfile/:id" element={<UserProfile />}></Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
