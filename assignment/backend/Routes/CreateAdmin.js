const express = require('express');
const router = express.Router()
const User = require('../models/User')                                                              // Importing the User model
const Admin = require('../models/Admin');

const { body, validationResult } = require('express-validator');                                    // Importing express-validator for input validation

const jwt = require("jsonwebtoken");                                                                // Importing jsonwebtoken for token generation
const bcrypt = require("bcryptjs");                                                                 // Importing bcryptjs for password hashing

const jwtSecret = "HiNanna";                                                                        // Secret key for JWT token generation


router.post("/CreateAdmin", [

    body('email', 'Email Format is not correct').isEmail(),                                         // Validate email format
    body('name').isLength({ min: 4 }),                                                              // Validate minimum length of name
    body('password', 'Incorrect Password').isLength({ min: 7 }),                                    // Validate minimum length of password
    body('shopname').isLength({min: 4}),
    body('contact').isLength({ min: 10, max: 10 })]


, async (req, res) => {

    const errors = validationResult(req);                                                           // Check for validation errors

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });                                    // Return validation errors if any
    }

    const salt = await bcrypt.genSalt(10);                                                          // Generate salt for password hashing
    let secPass = await bcrypt.hash(req.body.password, salt);                                       // Hash the password

    try {
        await Admin.create({
            name: req.body.name,
            password: req.body.password,                              // Use Hashed Password instead of normal password
            email: req.body.email,
            shopname: req.body.shopname,
            contact: req.body.contact
        });

        res.json({ success: true });                        // Send success response

    } catch (error) {
        console.log(error);
        res.json({ success: false });                       // Send failure response
    }
});


router.post("/loginAdmin", async (req, res) => {

    let email = req.body.email;                                                                     // Get email from request body

    try {
        let adminData = await Admin.findOne({ email });                                               // Find user data by email

        if (!adminData) {
            return res.status(400).json({ errors: "Incorrect email or password" });                 // Return error if user not found
        }
        
        if(req.body.password === adminData.password){
            passwordCompare = 1;
        }
        //const passwordCompare = await bcrypt.compare(req.body.password, userData.password);          // Compare passwords

        if (!passwordCompare) {
            return res.status(400).json({ errors: "Incorrect email or password" });                 // Return error if passwords don't match
        }

        const data = { admin: {id: adminData.id} };

        const authToken = jwt.sign(data, jwtSecret);                                                // Generate JWT token
        return res.json({ success: true, authToken: authToken });                                   // Send success response with token

    } catch (error) {
        console.log(error);
        res.json({ success: false });                                                               // Send failure response
    }
});

module.exports = router;    
