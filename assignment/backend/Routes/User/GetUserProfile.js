const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const jwtSecret = "GunturKaramBokka";

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authToken = req.headers.authorization;

  console.log("Auth token:", authToken); // Log the auth token

  if (!authToken) {
    console.log("Token not provided");
    return res.status(401).json({ success: false, error: 'Unauthorized: Token not provided' });
  }

  try {
    const decoded = jwt.verify(authToken.split(' ')[1], jwtSecret); // Extract token and verify
    req.user = decoded.user; 
    console.log("Decoded user:", req.user); // Log the decoded user object
    next();
  } catch (error) {
    console.log("Invalid token:", error.message); // Log the error message
    return res.status(401).json({ success: false, error: 'Unauthorized: Invalid token' });
  }
};

// Endpoint to retrieve user profile
router.get('/getUserProfile', verifyToken, async (req, res) => {
  try {
    console.log("User email:", req.user.email); // Log the user's email

    const userProfile = await User.findOne({ email: req.user.email }).select('-password');
    console.log("User profile:", userProfile); // Log the user profile retrieved from the database

    if (!userProfile) {
      console.log("User profile not found");
      return res.status(404).json({ success: false, error: 'User profile not found' });
    }

    res.json({ success: true, userProfile });
    console.log("Response sent successfully");
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
