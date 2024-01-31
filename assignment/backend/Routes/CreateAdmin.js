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
    body('password', 'Incorrect Password').isLength({ min: 5 }),                                    // Validate minimum length of password
    body('shopname').isLength({min: 4}),
    body('contact').isLength({ min: 10, max: 10 })]


, async (req, res) => {

    console.log("Received request:", req.body);

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newAdmin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            shopname: req.body.shopname,
            contact: req.body.contact
        });

        await newAdmin.save(); // Save the new admin to the database

        console.log("Admin created successfully");
        return res.json({ success: true }); // Send success response
    } catch (error) {
        console.error("Error creating admin:", error); // Log any errors
        return res.status(500).json({ success: false, error: "Internal Server Error" }); // Send failure response
    }
});


router.post("/loginAdmin", async (req, res) => {

    let email = req.body.email;                                                                     // Get email from request body

    try {
        let adminData = await Admin.findOne({ email });                                               // Find user data by email

        if (!adminData) {
            return res.status(400).json({ errors: "Incorrect email or password" });                 // Return error if user not found
        }

        const passwordCompare = await bcrypt.compare(req.body.password, adminData.password);          // Compare passwords

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