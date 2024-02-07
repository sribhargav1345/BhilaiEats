const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const jwtSecret = "GunturKaramBokka";


const verifyToken = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Token not provided' });
  }

  try {
    const decoded = jwt.verify(authToken, jwtSecret);
    req.user = decoded.user; 
    next();
  } 
  
  catch (error) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Invalid token' });
  }
};

// Route for fetching user profile
router.get('/getUserProfile', verifyToken, async (req, res) => {
  try {
    const userProfile = await User.findById(req.user.id).select('-password'); 
    if (!userProfile) {
      return res.status(404).json({ success: false, error: 'User profile not found' });
    }
    res.json({ success: true, userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
