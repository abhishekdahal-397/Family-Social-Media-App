import React, { useState } from "react";
import LeftSection from "./LeftSection";
import MidSection from "./MidSection";
import { useEffect } from "react";
import axios from "axios";
import RightSection from "./RightSection";

const HomePage = () => {
	return (
		<div style={{ display: "flex" }}>
			<LeftSection />
			<MidSection />
			<RightSection />
		</div>
	);
};

export default HomePage;
