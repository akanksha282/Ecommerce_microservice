const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, deleteOrdersByUser } = require("../controllers/orderController.js");
const apiKeyAuth=require('../middleware/apiKeyAuthentication.js')
const jwtAuthentication=require('../middleware/jwtAuthentication.js')


router.post("/",jwtAuthentication, createOrder);
router.get("/:id",jwtAuthentication ,getOrderById);
router.delete("/:id", apiKeyAuth, deleteOrdersByUser);


module.exports = router;
