import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import rose from "./rose.jpg";

const OutgoingRequest = () => {
	const [receivers, setReceivers] = useState([]);
	const sender = useSelector((state) => state.user.userId);

	const getUsers = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3002/api/users/getUsers"
			);

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
		<div className="p-7">
			<h1 className="text-[5vh]">People you may know</h1>

			{receivers.map((receiver) => {
				return (
					<div
						className="requestbox w-[40vw] m-5 rounded bg-blue-400"
						key={receiver._id}
					>
						<div className="flex m-4">
							<img
								className="ProfileIcon h-9 w-9 rounded-full "
								src={rose}
								alt="profile"
							></img>
							<span className="relative top-2 left-2 text-xl">
								{receiver.username.charAt(0).toUpperCase() +
									receiver.username.slice(1).toLowerCase()}
							</span>{" "}
						</div>
						<button
							onClick={() => sendRequest(sender, receiver._id)}
							className="h-[6vh] w-[10vw] m-3 bg-blue-200 border rounded hover:bg-blue-400 "
						>
							Add Friend
						</button>
						<button className="h-[6vh] w-[10vw] bg-blue-200 border rounded hover:bg-blue-400">
							delete
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default OutgoingRequest;
