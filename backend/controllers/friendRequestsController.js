const mongoose = require("mongoose"); // Import Mongoose
const FriendRequest = require("../models/FriendRequest"); // Import your FriendRequest model

const User = require("../models/userModel");
async function sendRequest(req, res) {
	try {
		const { senderId, receiverId } = req.body;

		const sender = await User.findById(senderId);
		const receiver = await User.findById(receiverId);
		if (!sender || !receiver) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid sender or receiver ID" });
		}
		// Check if a request already exists between these users
		const existingRequest = await FriendRequest.findOne({
			sender: senderId,
			receiver: receiverId,
		});
		if (existingRequest) {
			console.log("already request sent ");

			return res
				.status(400)
				.json({ success: false, message: "Friend request already sent" });
		}
		const friendRequest = new FriendRequest({
			sender: senderId,
			receiver: receiverId,
		});
		await friendRequest.save();
		// Update user's friend request fields
		await User.findByIdAndUpdate(senderId, {
			$addToSet: { friendRequestsSent: receiverId },
		});
		await User.findByIdAndUpdate(receiverId, {
			$addToSet: { friendRequestsReceived: senderId },
		});

		res
			.status(201)
			.json({ success: true, message: "Friend request sent successfully" });
	} catch (error) {
		console.error("Error sending friend request:", error);
		res
			.status(500)
			.json({ success: false, message: "Failed to send friend request" });
	}
}
async function acceptRequest(req, res) {
	try {
		const { senderId, receiverId } = req.params;

		// Find the friend request using senderId and receiverId
		const friendRequest = await FriendRequest.findOne({
			sender: senderId,
			receiver: receiverId,
		});

		if (!friendRequest) {
			return res
				.status(404)
				.json({ success: false, message: "Friend request not found" });
		}

		// Get the ID of the currently authenticated user (assuming receiver is the one accepting)
		const currentUserId = receiverId;

		// Ensure the current user is the receiver of the friend request
		if (friendRequest.receiver.toString() !== currentUserId) {
			return res.status(403).json({
				success: false,
				message: "You are not authorized to accept this request",
			});
		}

		// Update users' friends list
		await User.findByIdAndUpdate(friendRequest.sender, {
			$addToSet: { friends: friendRequest.receiver },
			$pull: { friendRequestsSent: friendRequest.receiver },
		});
		await User.findByIdAndUpdate(friendRequest.receiver, {
			$addToSet: { friends: friendRequest.sender },
			$pull: { friendRequestsReceived: friendRequest.sender },
		});

		// Update the status of the friend request to 'accepted'
		friendRequest.status = "accepted";
		await friendRequest.save();

		res
			.status(200)
			.json({ success: true, message: "Friend request accepted successfully" });
	} catch (error) {
		console.error("Error accepting friend request:", error);
		res
			.status(500)
			.json({ success: false, message: "Failed to accept friend request" });
	}
}

async function rejectRequest(req, res) {
	try {
		const requestId = req.params.id;
		// Find and delete the friend request
		const friendRequest = await FriendRequest.findByIdAndDelete(requestId);
		if (!friendRequest) {
			return res
				.status(404)
				.json({ success: false, message: "Request not found" });
		}
		res
			.status(200)
			.json({ success: true, message: "Friend request rejected successfully" });
	} catch (error) {
		console.error("Error rejecting friend request:", error);
		res
			.status(500)
			.json({ success: false, message: "Failed to reject friend request" });
	}
}
async function getAllRequests(req, res) {
	try {
		// Fetch all friend requests, populating sender and receiver details
		const friendRequests = await FriendRequest.find()
			.populate("sender", "username profilePicture")
			.populate("receiver", "username profilePicture");

		res.status(200).json({ success: true, friendRequests });
	} catch (error) {
		console.error("Error fetching friend requests:", error);
		res
			.status(500)
			.json({ success: false, message: "Failed to fetch friend requests" });
	}
}
async function reqSenders(req, res) {
	try {
		const userId = req.params.id;
		console.log("Fetching friend requests for user:", userId);
		// Check if userId is a valid ObjectId
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			console.log("Invalid user ID:", userId);
			return res
				.status(400)
				.json({ success: false, message: "Invalid user ID" });
		}
		const friendRequests = await FriendRequest.find({
			receiver: userId,
		}).populate("sender", "username profilePicture");

		if (!friendRequests) {
			console.log("No friend requests found for user:", userId);
		}

		const senders = friendRequests.map((request) => request.sender);

		res.status(200).json({ success: true, senders });
	} catch (error) {
		console.error("Error fetching sender details:", error.message, error.stack);
		res
			.status(500)
			.json({ success: false, message: "Failed to fetch sender details" });
	}
}
async function getRequestWithSenderAndReceiverId(req, res) {
	try {
		const { sender, receiver } = req.body;

		if (!sender || !receiver) {
			return res
				.status(400)
				.json({ message: "Sender and receiver IDs are required" });
		}

		const requests = await FriendRequest.find({
			sender,
			receiver,
		});

		if (requests.length === 0) {
			return res.status(404).json({ message: "No such request found" });
		}

		return res
			.status(200)
			.json({ message: "Successfully got the request object", requests });
	} catch (error) {
		console.error("Error fetching friend request:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}
async function acceptedUserRequests(req, res) {
	try {
		const { receiverId } = req.params;
		const acceptedRequests = await FriendRequest.find({
			receiver: receiverId,
			status: "accepted",
		}).populate("sender", "username profileUrl"); // Populates the sender field with user details

		if (acceptedRequests.length > 0) {
			res.status(200).json(acceptedRequests);
		} else {
			res.status(404).json({ message: "No accepted friend requests found." });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function getPendingRequestsOfUser(req, res) {
	try {
		const userId = req.params.id;
		const pendingRequests = await FriendRequest.find({
			status: "pending",
			receiver: userId,
			sender: { $ne: userId }, // Ensure sender is not the userId
		}).populate("sender", "username profileUrl"); // Populate sender field with username and profilePicture

		res.status(200).json(pendingRequests);
	} catch (err) {
		console.error("Error fetching pending requests:", err);
		res.status(500).json({ message: "Error fetching pending requests" });
	}
}

module.exports = {
	sendRequest,
	acceptRequest,
	rejectRequest,
	getAllRequests,
	reqSenders,
	getRequestWithSenderAndReceiverId,
	acceptedUserRequests,
	getPendingRequestsOfUser,
};
