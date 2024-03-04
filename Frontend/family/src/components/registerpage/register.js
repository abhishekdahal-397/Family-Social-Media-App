import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/register",
        {
          username,
          email,
          password,
        },
        { timeout: 5000 }
      );

      // Check if 'response' and 'response.data' exist before accessing 'data.token'
      if (response && response.data && response.data.token) {
        console.log("Token:", response.data.token);

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
    <form className="max-w-md mx-auto mt-8" onSubmit={handleRegister}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username:
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Register
      </button>
      <div>
        {" "}
        Already here?{" "}
        <Link className="text-blue-400" to="/login">
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
