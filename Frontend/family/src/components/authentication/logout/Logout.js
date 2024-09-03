import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/user/userSlice";

const Logout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.user.token);

	useEffect(() => {
		console.log("Entered useEffect");

		// Dispatch logout action to clear Redux state
		dispatch(logout());

		// Remove the token from localStorage
		localStorage.removeItem("token");

		// Remove the cookie (if any)
		document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

		// Navigate to the login page
		navigate("/login");

		console.log("After logout, token is:", token);
	}, [dispatch, navigate]);

	return <div className="bg-red-300">Logging out...</div>;
};

export default Logout;
