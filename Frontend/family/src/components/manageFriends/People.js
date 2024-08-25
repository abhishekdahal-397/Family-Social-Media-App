import React from "react";
import IncomingRequest from "./IncomingRequest";
import OutgoingRequest from "./OutgoingRequest";

const People = () => {
	return (
		<div className="bg-blue-400">
			<IncomingRequest />
			<OutgoingRequest />
		</div>
	);
};

export default People;
