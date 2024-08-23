import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Upload = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const userId = useSelector((state) => state.user.userId);
	const handleUpload = async () => {
		console.log("upload button clicked");

		try {
			const formData = new FormData();
			formData.append("file", selectedFile);

			const response = await axios.post(
				`http://localhost:3002/api/posts/upload/${userId}`,
				formData
			);
			console.log(response);

			console.log("uploaded");

			// Handle the response (e.g., update UI)
		} catch (error) {
			console.error("Error uploading image", error);
			// Handle error (e.g., show error message to the user)
		}
	};
	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};
	return (
		<div className="h-auto w-full">
			<input className="input " type="file" onChange={handleFileChange} />
			<button
				onClick={handleUpload}
				className="rounded uploadbtn h-[40px] w-[60px]"
			>
				Upload
			</button>
		</div>
	);
};

export default Upload;
