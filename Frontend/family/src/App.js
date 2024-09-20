import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { automaticLogin } from "./features/user/userSlice";
import LoginForm from "./components/authentication/loginpage/login";
import Navbar from "./components/userDashboard/HomePage/Navbar";
import RegisterForm from "./components/authentication/registerpage/register";
import People from "./components/manageFriends/People";
import UserProfile from "./components/ProfilePage/profile";
import HomePage from "./components/userDashboard/HomePage/HomePage";
import Logout from "./components/authentication/logout/Logout";
import CommentBox from "./components/CommentBox/CommentBox";
import PrivateRoute from "./components/authentication/privateRoutes/PrivateRoute";

function App() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.user.token);
	console.log("state", token);

	useEffect(() => {
		dispatch(automaticLogin());
	}, [dispatch]);

	return (
		<Router>
			<div className="App">
				{token && <Navbar />} {/* Show Navbar only if user is authenticated */}
				<Routes>
					<Route
						path="/"
						element={<Navigate to={token ? "/home" : "/login"} />}
					/>
					<Route
						path="/login"
						element={token ? <Navigate to="/home" /> : <LoginForm />}
					/>
					<Route
						path="/register"
						element={token ? <Navigate to="/home" /> : <RegisterForm />}
					/>

					{/* Protected routes */}
					<Route element={<PrivateRoute />}>
						<Route path="/home" element={<HomePage />} />
						<Route path="/requests" element={<People />} />
						<Route path="/userProfile/:id" element={<UserProfile />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="/commentbox" element={<CommentBox />} />
					</Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
