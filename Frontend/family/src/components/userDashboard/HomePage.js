import React from "react";
import LeftSection from "./LeftSection";
import MidSection from "./MidSection";

const HomePage = () => {
	return (
		<div style={{ display: "flex" }}>
			<LeftSection />
			<MidSection />
		</div>
	);
};

export default HomePage;
