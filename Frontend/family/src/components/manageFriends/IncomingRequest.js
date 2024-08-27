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
			console.log("inoming request response:", response.data);
			setFriendReqSenders(response.data);
		};
		getReqSenders();
	}, [userId]);
	const handleAcceptButtonClick = async (senderId, userId) => {
		try {
			const res1 = await axios.post(
				"http://localhost:3002/api/friend-requests/getRequestWithSenderAndReceiverId",
				{
					sender: senderId,
					receiver: userId,
				}
			);

			console.log("res1 is ", res1.data.requests[0]._id);
			const requestId = res1.data.requests[0]._id;
			const response = await axios.put(
				`http://localhost:3002/api/friend-requests/${requestId}/accept`,
				{
					userId: userId,
				}
			);

			if (response.data.success) {
				alert("Friend request accepted successfully");

				// Optionally, update the local state to remove the accepted request
				setFriendReqSenders((prev) =>
					prev.filter((sender) => sender._id !== senderId)
				);
			} else {
				alert("Failed to accept friend request");
			}
		} catch (error) {
			console.log("sender and user id ", senderId, userId);
			console.log("Error accepting friend request:", error);
			alert("Error accepting friend request");
		}
	};

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
							onClick={() => handleAcceptButtonClick(sender._id, userId)}
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
