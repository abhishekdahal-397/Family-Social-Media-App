// routes/friendRequests.js
const express = require("express");
const router = express.Router();
const friendRequestController = require("../controllers/friendRequestsController");
// Define routes for friend requests
router.post("/friend-requests", friendRequestController.sendRequest); // /api/friend-requests
router.put(
  "/friend-requests/:id/accept",
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
module.exports = router;
