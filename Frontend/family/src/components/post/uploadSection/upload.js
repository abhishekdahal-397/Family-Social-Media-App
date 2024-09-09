import axios from "axios";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Upload = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const userId = useSelector((state) => state.user.userId);
	const fileInputRef = useRef(null);

	const handleUpload = async () => {
		if (!selectedFile) {
			console.error("No file selected for upload");
			toast.error("no file selected ");

			return;
		}

		try {
			const formData = new FormData();
			formData.append("file", selectedFile);

			const response = await axios.post(
				`http://localhost:3002/api/posts/upload/${userId}`,
				formData
			);
			console.log("Uploaded", response);
			toast.success("Image  uploaded successfully");

			if (response.status === 200) {
				setSelectedFile(null);
				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}
			}
		} catch (error) {
			console.error("Error uploading image", error);
		}
	};

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	return (
		<div className="h-auto w-full">
			<input
				className="input"
				type="file"
				onChange={handleFileChange}
				ref={fileInputRef}
			/>
			<button
				onClick={handleUpload}
				className="rounded uploadbtn h-[40px] w-[60px]"
				disabled={!selectedFile}
			>
				Upload
			</button>

			<ToastContainer />
		</div>
	);
};

export default Upload;
