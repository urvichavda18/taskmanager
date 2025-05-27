const express = require('express');
const { registerUser } = require('../controller/authController/registerUser');
const { loginUser } = require('../controller/authController/loginUser');
const { getUserProfile } = require('../controller/authController/getUserProfile');
const { updateUserProfile } = require('../controller/authController/updateUserProfile');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile",protect, getUserProfile);
router.put("/profile",protect, updateUserProfile);

module.exports = router;


