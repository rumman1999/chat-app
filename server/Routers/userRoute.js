const express  = require("express");
const {registerUser , loginUser , findUser , getUsers} = require("../Controllers/userController.js")

const router = express.Router();

router.post("/register" , registerUser)
router.post("/login" , loginUser)
router.get("/find/:userId" , findUser);
router.get("/getUsers" , getUsers)

module.exports = router; 