const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "GunturKaramBokka";

const verifyToken = (req) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return { success: false, error: 'Authorization token is missing' };
    }

    try {
        const decoded = jwt.verify(authToken, jwtSecret);
        const id = decoded.user.id;
        return { success: true, id };
    } catch (error) {
        console.error("Token verification failed:", error);
        return { success: false, error: 'Invalid authorization token' };
    }
};


router.post("/createUser", [
    body('email', 'Email Format is not correct').isEmail(),
    body('name').isLength({ min: 4 }),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            console.log("Email already Registered");
            return res.status(400).json({ success: false, error: "Email Already Registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await User.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
        });

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

router.post("/loginUser", async (req, res) => {

    const { email, password } = req.body;

    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ error: "Incorrect email or password" });
        }

        const passwordCompare = await bcrypt.compare(password, userData.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Incorrect email or password" });
        }

        const tokenPayload = { user: { id: userData.id, email: userData.email } };
        const authToken = jwt.sign(tokenPayload, jwtSecret);

        return res.json({ success: true, authToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

router.get('/getUserProfile', async (req, res) => {
    const tokenVerificationResult = verifyToken(req);
    if (!tokenVerificationResult.success) {
        return res.status(401).json({ success: false, error: 'Invalid authorization token' });
    }

    try {
        console.log(req.headers);
        const userProfile = await User.findOne({ email: req.headers.email }).select('-password');
        if (!userProfile) {
            return res.status(404).json({ success: false, error: 'User profile not found' });
        }
        return res.json({ success: true, userProfile });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});


module.exports = router;
