import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OutgoingRequest = () => {
	const [receivers, setReceivers] = useState([]);
	const sender = useSelector((state) => state.user.userId);

	const getUsers = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3002/api/users/getUsers"
			);
			console.log("these are users data", response.data);
			setReceivers(response.data);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);
	const sendRequest = async (senderId, receiverId) => {
		try {
			const response = await axios.post(
				"http://localhost:3002/api/sendFriendRequest",
				{ senderId, receiverId }
			);
			console.log("Friend request sent:", response);
			// Optionally update UI or state here
		} catch (error) {
			console.log("something is going wrong.");
		}
	};

	return (
		<div>
			{receivers.map((receiver) => {
				return (
					<div className="requestbox w-[20vw] bg-red-400 " key={receiver._id}>
						{receiver.username}

						<button
							onClick={() => sendRequest(sender, receiver._id)}
							className="h-[6vh] w-[10vw] bg-blue-200 border rounded "
						>
							Add Friend
						</button>
						<button className="h-[6vh] w-[10vh] bg-blue-200 border rounded ">
							delete
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default OutgoingRequest;
