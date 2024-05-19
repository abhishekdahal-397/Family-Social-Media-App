import React, { useState } from "react";
import LeftSection from "./LeftSection";
import MidSection from "./MidSection";
import { useEffect } from "react";
import axios from "axios";

const HomePage = () => {
	// const [userId, setUserId] = useState(null);
	// const [error, setError] = useState(null);
	// useEffect(() => {
	// 	const fetchUserId = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				"https://your-backend-url.com/api/userid"
	// 			);
	// 			setUserId(response.data.userId);
	// 		} catch (err) {
	// 			setError(err.message);
	// 		}
	// 	};

	// 	fetchUserId();
	// }, []);
	return (
		<div style={{ display: "flex" }}>
			<LeftSection />
			<MidSection />
		</div>
	);
};

export default HomePage;
