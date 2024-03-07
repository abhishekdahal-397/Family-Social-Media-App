import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email,
          password,
        }
      );

      console.log("Token:", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
      setErrorMessage("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  const handleTogglePassword = () => {
    setSeePassword(!seePassword);
  };

  return (
    <div className="fullloginpage">
      <form
        className=" loginform max-w-md mx-auto pt-8 "
        onSubmit={handleLogin}
      >
        <div className=" logininputs mb-4 ">
          <label
            className=" emailpasswordlabel block  text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="appearance-none border rounded w-[80%] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 logininputs">
          <label
            className=" emailpasswordlabel block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            type={seePassword ? "text" : "password"}
            className="appearance-none  border rounded w-[80%] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="visibility" onClick={handleTogglePassword}>
            {seePassword ? <MdVisibility /> : <MdVisibilityOff />}
          </div>
        </div>

        <button
          className="loginbuttom bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
        <div className=" newhere mt-4">
          New Here?{" "}
          <Link to="/register" className="text-blue-300">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
