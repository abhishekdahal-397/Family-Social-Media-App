import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./IncomingRequest.css";

const IncomingRequest = () => {
	const userId = useSelector((state) => state.user.userId);
	const [friendReqSenders, setFriendReqSenders] = useState([]);

	useEffect(() => {
		const getReqSenders = async () => {
			const response = await axios.get(
				`http://localhost:3002/api/friend-requests/requestSenders/${userId}`
			);
			console.log(response.data.senders);
			setFriendReqSenders(response.data.senders);
		};

		getReqSenders();
	}, []);

	return (
		<div>
			{friendReqSenders.map((sender, index) => {
				return (
					<div className="requestbox w-[20vw] bg-red-400 " key={index}>
						{sender.username}

						<button className="h-[6vh] w-[10vw] bg-blue-200 border rounded ">
							Accept
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

export default IncomingRequest;
