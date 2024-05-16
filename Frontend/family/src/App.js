import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/userDashboard/Homepage";
import RegisterForm from "./components/registerpage/register";
import LoginForm from "./components/loginpage/login";
import Navbar from "./components/userDashboard/Navbar";
// import axios from "axios";
import ManageFriends from "./components/manageFriends/ManageFriends";
import CommentBox from "./components/CommentBox/CommentBox";
function App() {
	// async function getUserData(userId) {
	//   try {
	//     const response = await axios.get(`/api/users/${userId}`);
	//     return response.data;
	//   } catch (error) {
	//     console.error("Error fetching user data:", error);
	//     throw error;
	//   }
	// }
	// Function to handle successful login and fetch user data
	// const handleLogin = async (userId) => {
	//   try {
	//     const userData = await getUserData(userId); // Fetch user data from backend
	//     setUserData(userData); // Update state with user data
	//   } catch (error) {
	//     console.error("Error fetching user data:", error);
	//   }
	// };

	return (
		// <Router>
		//   <div className="App">
		//     <Navbar />
		//     <Routes>
		//       <Route path="/" element={<HomePage />} />
		//       <Route path="/register" element={<RegisterForm />} />
		//       <Route path="/login" element={<LoginForm />} />
		//       <Route path="/dashboard/:userId" element={<HomePage />} />
		//       <Route path="/requests" element={<ManageFriends />}></Route>
		//       {/* <Route path="/userProfile/:id" element={<UserProfile />}></Route> */}
		//     </Routes>
		//   </div>
		// </Router>
		<>
			<CommentBox />
		</>
	);
}

export default App;
