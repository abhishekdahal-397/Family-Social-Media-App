import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/user/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.user.token);

	useEffect(() => {
		// Dispatch logout action to clear Redux state
		dispatch(logout());

		// Remove the token from localStorage
		localStorage.removeItem("token");

		// Remove the cookie (if any)
		document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

		// Navigate to the login page
		navigate("/login");
		toast.success("Successfully logged out");
		console.log("successful logout ");
	}, [dispatch, navigate]);

	return (
		<div className="bg-red-300">
			Logging out...
			<ToastContainer />
		</div>
	);
};

export default Logout;
