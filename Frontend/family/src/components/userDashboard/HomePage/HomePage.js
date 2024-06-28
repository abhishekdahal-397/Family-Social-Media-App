import React, { useState } from "react";
import LeftSection from "./LeftSection";
import MidSection from "./MidSection";
import { useEffect } from "react";
import axios from "axios";

const HomePage = () => {
	return (
		<div style={{ display: "flex" }}>
			<LeftSection />
			<MidSection />
		</div>
	);
};

export default HomePage;
