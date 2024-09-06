import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./IncomingRequest.css";
import rose from "./rose.jpg";
import friendsSlice from "../../features/Friend/friendsSlice";
const IncomingRequest = () => {
	const userId = useSelector((state) => state.user.userId);
	const [friendReqSenders, setFriendReqSenders] = useState([]);

	useEffect(() => {
		if (!userId) return;
		const getReqSenders = async () => {
			const response = await axios.get(
				`http://localhost:3002/api/friend-requests/getPendingRequestsOfUser/${userId}`
			);

			setFriendReqSenders(response.data);
		};
		getReqSenders();
	}, [userId]);

	const handleAcceptButtonClick = async (senderId, receiverId) => {
		try {
			const response = await axios.put(
				`http://localhost:3002/api/friend-requests/accept/${senderId}/${receiverId}`
			);

			if (response.data.success) {
				console.log("Friend request accepted successfully");
				setFriendReqSenders(() =>
					friendReqSenders.filter(
						(req) => req.sender !== senderId && req.receiver !== receiverId
					)
				);
				console.log("friendreqSenders", friendReqSenders);
			} else {
				alert("Failed to accept friend request");
			}
		} catch (error) {
			console.log("sender and user id ", senderId, userId);
			console.log("Error accepting friend request:", error);
			alert("Error accepting friend request");
		}
	};
	useEffect(() => {
		console.log("Updated friendReqSenders", friendReqSenders);
	}, [friendReqSenders]);
	return (
		<div className="p-7">
			<h1 className="text-[5vh]">Friend Requests</h1>
			{Array.isArray(friendReqSenders) &&
				friendReqSenders.map((sender, index) => (
					<div
						className="requestbox w-[40vw] m-5 rounded bg-pink-400  "
						key={index}
					>
						<div className="flex m-4">
							<img
								className="ProfileIcon h-9 w-9 rounded-full "
								src={rose}
								alt="profile"
							></img>
							<span className="relative top-2 left-2 text-xl">
								{sender.sender.username}
							</span>{" "}
						</div>

						<button
							onClick={() => handleAcceptButtonClick(sender.sender._id, userId)}
							className="h-[6vh] w-[10vw] m-3 bg-blue-200 border rounded hover:bg-blue-400"
						>
							Accept
						</button>
						<button className="h-[6vh] w-[10vw] bg-blue-200 border rounded hover:bg-blue-400">
							Delete
						</button>
					</div>
				))}
		</div>
	);
};

export default IncomingRequest;
