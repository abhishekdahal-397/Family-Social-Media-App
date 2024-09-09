import React, { useState } from "react";
import LeftSection from "./LeftSection";
import MidSection from "./MidSection";
import { useEffect } from "react";
import axios from "axios";
import RightSection from "./RightSection";
import CommentBox from "../../CommentBox/CommentBox";

const HomePage = () => {
	return (
		<div className="absolute" style={{ display: "flex" }}>
			<LeftSection />
			<CommentBox />
			<RightSection />
		</div>
	);
};

export default HomePage;
