import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/user/userSlice";

const Logout = () => {
	console.log("came to logout");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	console.log("token from logout is ", token);

	useEffect(() => {
		console.log("entered useEffect");

		dispatch(logout());
		localStorage.removeItem("token");

		navigate("/login");
		console.log("after logout token is ", token);
	}, []);

	return <div className="bg-red-300">Logging out</div>;
};

export default Logout;
