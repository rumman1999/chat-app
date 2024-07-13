const express = require("express");
const { createChats, findUserChat, findChat } = require("../Controllers/chatController");

const router = express.Router();

router.post("/" , createChats)
router.get("/:userId" , findUserChat)
router.get("/find/:firstId/:secondId" , findChat)

module.exports = router;