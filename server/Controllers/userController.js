const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const creatToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body)
  try {
    let user = await userModel.findOne({ email });
    if (user)
      return res.status(400).json("User with the given email already exists");

    if (!name || !email || !password)
      return res.status(404).json("All fields are required");

    if (!validator.isEmail(email))
      return res.status(400).json("Email must be a valid email ");

    //   if (!validator.isStrongPassword(password))
    //     return res.status(400).json("Email must be a strong password");

    user = new userModel({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = creatToken(user._id);

    res.status(200).json({
      _id: user._id,
      name,
      email,
      token,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json("Invalid email ....");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return res.status(400).json("Invalid Paassword .....");

    const token = creatToken(user._id);

    res.status(200).json({
      _id: user._id,
      name : user.name ,
      email,
      token,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json(err);
  }
};

const findUser = async(req , res) => {
    const userId = req.params.userId;
    try{
        const user = await userModel.findById(userId)
        res.status(200).json(user)
    }catch(arr){
        console.log("err", err);
    res.status(500).json(err);
    }
}

const getUsers = async(req , res) => {
    try{
        const users = await userModel.find()
        res.status(200).json(users)
    }catch(arr){
        console.log("err", err);
    res.status(500).json(err);
    }
}

module.exports = { registerUser , loginUser  , findUser , getUsers};
