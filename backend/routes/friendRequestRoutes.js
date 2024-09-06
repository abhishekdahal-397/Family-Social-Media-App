// routes/friendRequests.js
const express = require("express");
const router = express.Router();
const friendRequestController = require("../controllers/friendRequestsController");

// Define routes for friend requests
router.post("/sendFriendRequest", friendRequestController.sendRequest); // /api/friend-requests
router.put(
	"/friend-requests/accept/:senderId/:receiverId",
	friendRequestController.acceptRequest
); // /api/friend-requests/:id/accept
router.put(
	"/friend-requests/:id/reject",
	friendRequestController.rejectRequest
); // /api/friend-requests/:id/reject
router.get("/friend-requests", friendRequestController.getAllRequests); // /api/friend-requests
router.get(
	"/friend-requests/requestSenders/:id",
	friendRequestController.reqSenders
); // /api/friend-requests/requestSenders/:id
router.post(
	"/friend-requests/getRequestWithSenderAndReceiverId",
	friendRequestController.getRequestWithSenderAndReceiverId
);
router.get(
	"/friend-requests/acceptedUserRequests/:receiverId",
	friendRequestController.acceptedUserRequests
);
router.get(
	"/friend-requests/getPendingRequestsOfUser/:id",
	friendRequestController.getPendingRequestsOfUser
);
router.get(
	"/friend-requests/peopleYouMayKnow/:id",
	friendRequestController.peopleYouMayKnow
); //api/friend-requests/peopleYouMayKnow/:id
module.exports = router;
