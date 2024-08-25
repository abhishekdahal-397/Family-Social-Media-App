import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./IncomingRequest.css";
import rose from "./rose.jpg";

const IncomingRequest = () => {
	const userId = useSelector((state) => state.user.userId);
	const [friendReqSenders, setFriendReqSenders] = useState([]);

	useEffect(() => {
		if (!userId) return;
		const getReqSenders = async () => {
			console.log("userid are ", userId);

			const response = await axios.get(
				`http://localhost:3002/api/friend-requests/requestSenders/${userId}`
			);

			setFriendReqSenders(response.data.senders);
		};

		getReqSenders();
	}, [userId]);

	return (
		<div className="p-7">
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
								{sender.username.charAt(0).toUpperCase() +
									sender.username.slice(1).toLowerCase()}
							</span>{" "}
						</div>

						<button className="h-[6vh] w-[10vw] m-3 bg-blue-200 border rounded hover:bg-blue-400">
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
