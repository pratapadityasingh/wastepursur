const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    const token = await newUser.generateToken();

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(200).json({ error: "Invalid login credentials" });
    }

    const isPasswordMatch = await userExist.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(200).json({ error: "Invalid login credentials" });
    }

    if  (isPasswordMatch && userExist.isStatus == true) {
      return res.status(200).json({ error: "You have been blocked" });
    }

    const token = await userExist.generateToken();

    res.status(201).json({
      token: token,
      message: "Login successful",
      success: true,
      userId: userExist._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SEC_KEY, (err, decoded) => {
    if (err) {
      console.log("error");

      return res.status(401).json({ message: "Failed to authenticate token" });
    } else {
      // console.log("success");

      req.userId = decoded.userId;
      res.status(200).json({ message: "Failed to authenticate token" });
    }
  });
};

const saveAddress = async (req, res) => {
  try {
    
    const { id } = req.params;

    const {
      fullName,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
    } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.address = {
      fullName,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
    };

    await user.save();

    res.status(200).json({ message: "Address saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while saving address" });
  }
};

module.exports = { register, login, verifyToken, saveAddress };








