// This page is for Authentication of User Login and Signup system.

const express = require('express');
const router = express.Router()
const User = require('../../models/User')                                                              // Importing the User model

const { body, validationResult } = require('express-validator');                                    // Importing express-validator for input validation

const jwt = require("jsonwebtoken");                                                                // Importing jsonwebtoken for token generation
const bcrypt = require("bcryptjs");                                                                 // Importing bcryptjs for password hashing

const jwtSecret = "GunturKaramBokka";                                                               // Secret key for JWT token generation


router.post("/CreateUser", [

    body('email', 'Email Format is not correct').isEmail(),                                         // Validate email format
    body('name').isLength({ min: 4 }),                                                              // Validate minimum length of name
    body('password', 'Incorrect Password').isLength({ min: 5})]                                    // Validate minimum length of password

, async (req, res) => {

    const errors = validationResult(req);                                                           // Check for validation errors

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });                                    // Return validation errors if any
    }

    const salt = await bcrypt.genSalt(10);                                                          // Generate salt for password hashing
    let secPass = await bcrypt.hash(req.body.password, salt);                                       // Hash the password

    try {
        await User.create({
            name: req.body.name,
            password: secPass,                              // Use Hashed Password instead of normal password
            email: req.body.email,
        });

        res.json({ success: true });                        // Send success response
    } catch (error) {
        console.log(error);
        res.json({ success: false });                       // Send failure response
    }
});


router.post("/loginUser", async (req, res) => {

    let email = req.body.email;                                                                     // Get email from request body

    try {
        let userData = await User.findOne({ email });                                               // Find user data by email

        if (!userData) {
            return res.status(400).json({ errors: "Incorrect email or password" });                 // Return error if user not found
        }

        const passwordCompare = await bcrypt.compare(req.body.password, userData.password);          // Compare passwords

        if (!passwordCompare) {
            return res.status(400).json({ errors: "Incorrect email or password" });                 // Return error if passwords don't match
        }

        const data = { user: {id: userData.id} };

        const authToken = jwt.sign(data, jwtSecret);                                                // Generate JWT token
        return res.json({ success: true, authToken: authToken });                                   // Send success response with token

    } catch (error) {
        console.log(error);
        res.json({ success: false });                                                               // Send failure response
    }
});

module.exports = router;    
