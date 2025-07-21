const express=require('express')
const router=express.Router();
const {registerUser, loginUser, getUserById, deleteUserById}=require("../controllers/controller.js")
const {protect}=require("../middleware/auth.js")

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/:id", protect, getUserById);
router.delete("/:id", protect, deleteUserById);
module.exports = router;