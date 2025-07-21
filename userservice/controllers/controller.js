
const User = require("../models/userschema.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const axios = require("axios");

const axiosWithRetry=require("../../shared/axioswithRetry.js")

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { username, password, address, phone ,email} = req.body;
  
    if (!username || !password) return res.status(400).json({ msg: "All fields are required" });
  
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });  
    const user = await User.create({
      username,
      password,
      address,
      phone,
      email,
    });
        console.log("User saved:", user);
    res.status(201).json({
      msg: "User registered successfully",

    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// LOGIN
const loginUser = async (req, res) => {
 try {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) return res.status(400).json({ msg: "Invalid credentials email" });
   
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials password" });
   
     const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
     res.status(200).json({
       msg: "Login successful",
       token,
    user_id: user._id,
     });
 } catch (error) {
    console.error("loginUser Error:", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
    
 }

// GET PROFILE
const getUserById = async (req, res) => {
   if (req.headers['x-api-key'] !== process.env.API_KEY) {
      console.log("not matching")
      return res.status(403).json({ error: 'Unauthorized access' });
    }
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ msg: "User not found" });

  res.json(user);
};

// DELETE USER
const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ msg: "User not found" });

  await User.findByIdAndDelete(userId);

  try {
    // Notify Order Service
    await axiosWithRetry.delete(`http://localhost:5000/api/orders/${userId}`, 
          { 
           headers: { 'x-api-key': process.env.API_KEY,
           
            }

          }
        
    );
      console.log("pass")
       res.status(200).json({ msg: "User deleted and Order Service notified" });
  } 
  catch (err) {
    console.error("Error notifying Order Service:", err.message);
  }

 
};

module.exports = { registerUser, loginUser, getUserById, deleteUserById };
