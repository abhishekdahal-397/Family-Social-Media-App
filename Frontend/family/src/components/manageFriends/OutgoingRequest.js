import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import rose from "./rose.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OutgoingRequest = () => {
	const [receivers, setReceivers] = useState([]);
	const sender = useSelector((state) => state.user.userId);

	const getUsers = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3002/api/friend-requests/peopleYouMayKnow/${sender}`
			);
			console.log("fast", response.data.data);
			setReceivers(response.data.data);
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
			setReceivers((prevReceivers) =>
				prevReceivers.filter((receiver) => receiver._id !== receiverId)
			);
			toast("Friend Request Sent");
			// Optionally update UI or state here
		} catch (error) {
			console.log("something is going wrong.");
		}
	};

	return (
		<div className="p-7">
			{receivers && <h1 className="text-[5vh]">People you may know</h1>}

			{receivers.length !== 0 &&
				receivers?.map((receiver, index) => {
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
			<ToastContainer />
		</div>
	);
};

export default OutgoingRequest;
