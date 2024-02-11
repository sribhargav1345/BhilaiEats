const express = require('express');
const router = express.Router()                                                            
const Admin = require('../../models/Admin');

const jwt = require("jsonwebtoken");                                                                // Importing jsonwebtoken for token generation
const bcrypt = require("bcryptjs");                                                                 // Importing bcryptjs for password hashing

const jwtSecret = "HiNanna";                                                                        // Secret key for JWT token generation


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

        const shopname = adminData.shopname;

        const authToken = jwt.sign(data, jwtSecret);                                                // Generate JWT token
        return res.json({ success: true, authToken: authToken, shopname: shopname });                                   // Send success response with token

    } catch (error) {
        console.log(error);
        res.json({ success: false });                                                               // Send failure response
    }
});

module.exports = router;    