const Order = require('../models/order.js');
const axios = require('axios');
const {validateUser} =require('../services/userServiceValid.js')
const mongoose = require('mongoose'); 

const createOrder = async (req, res) => {
  const { items, deliveryAddress,status } = req.body;

     
    if (!items || !Array.isArray(items) || items.length === 0 || !deliveryAddress) {
      return res.status(400).json({ message: "Items and delivery address are required" });
    }
   const userId = req.user.user_id; 
   const token=req.headers.authorization?.split(" ")[1]// match with login payload


  try {
    // Validate user via User Service
    await validateUser(userId,token);

    const order = new Order({ userId, items,deliveryAddress,status});
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    console.error('Order creation error:', err.message);
    res.status(400).json({ error: 'Order creation failed: ' + err.message });
  }

};

const getOrderById = async (req, res) => {
  try {
    console.log("REQ.PARAMS:", req.params);

 
     const userId = req.params.id;
    console.log("Looking for User ID:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' }
        
      );
    }

    const order = await Order.find({ userId: userId });
    console.log(order)
   

    if (!order || order.length===0) {
      return res.status(404)
      .json({ message: 'Order not found' });
    }
    res.json(order);
  } 
  catch (err) 
  {
   console.error("Error in getOrderById:", err);
    res.status(500)
    .json({ message: 'Server error',error: err.message });
  }
};

const deleteOrdersByUser = async (req, res) => {
   try {
    console.log("can be delted")
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) 
    {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    await Order.deleteMany({ userId: req.params.id });
    console.log("deleted")
    res.json({ message: 'Orders deleted for user' });
  }
   catch (err) {
    console.error('Delete orders error:', err);
    res.status(500).json({ error: 'Failed to delete orders' });
  }

};

module.exports = {
  createOrder,
  getOrderById,
  deleteOrdersByUser
};
