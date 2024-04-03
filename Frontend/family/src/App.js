import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/userDashboard/Homepage";
import RegisterForm from "./components/registerpage/register";
import LoginForm from "./components/loginpage/login";
import Navbar from "./components/userDashboard/Navbar";
import axios from "axios";

function App() {
  async function getUserData(userId) {
    try {
      const response = await axios.get(`/api/users/${userId}`); // Replace with your actual API endpoint
      return response.data; // Extract the data from the response
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error; // Propagate the error to the caller
    }
  }
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
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard/:userId" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
