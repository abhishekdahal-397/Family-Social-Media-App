// controllers/friendRequestController.js
const FriendRequest = require("../models/FriendRequest");

const User = require("../models/userModel"); // Assuming you have a User model

async function sendRequest(req, res) {
  try {
    // Extract sender and receiver IDs from request body
    const { senderId, receiverId } = req.body;

    // Check if senderId and receiverId exist and are active users
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid sender or receiver ID" });
    }

    // Create a new friend request
    const friendRequest = new FriendRequest({
      sender: senderId,
      receiver: receiverId,
    });

    // Save the friend request to the database
    await friendRequest.save();

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
    // Extract request ID from URL parameters
    const requestId = req.params.id;

    // Update the status of the friend request to 'accepted'
    await FriendRequest.findByIdAndUpdate(requestId, { status: "accepted" });

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
    // Extract request ID from URL parameters
    const requestId = req.params.id;

    // Update the status of the friend request to 'rejected'
    await FriendRequest.findByIdAndUpdate(requestId, { status: "rejected" });

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
    // Fetch all friend requests from the database
    const friendRequests = await FriendRequest.find();

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
    const friendRequests = await FriendRequest.find({ receiver: userId });
    const senderIds = friendRequests.map((request) => request.sender);

    res.status(200).json({ success: true, senderIds });
  } catch (error) {
    console.error("Error fetching sender IDs:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch sender IDs" });
  }
}

module.exports = {
  sendRequest,
  acceptRequest,
  rejectRequest,
  getAllRequests,
  reqSenders,
};
