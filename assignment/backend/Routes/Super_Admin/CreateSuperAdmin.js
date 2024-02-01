const express = require('express');
const router = express.Router()
const SuperAdmin = require('../../models/SuperAdmin');

const { body, validationResult } = require('express-validator');                                    // Importing express-validator for input validation

const jwt = require("jsonwebtoken");                                                                // Importing jsonwebtoken for token generation
const bcrypt = require("bcryptjs");                                                                 // Importing bcryptjs for password hashing

const jwtSecret = "BhargavRocks";                                                                   // Secret key for JWT token generation


// router.post("/CreateSuperAdmin", [

//     body('email', 'Email Format is not correct').isEmail(),                                         // Restrictions for Details
//     body('name').isLength({ min: 4 }),                                                              
//     body('password', 'Incorrect Password').isLength({ min: 5 }),                                   
//     body('contact').isLength({ min: 10, max: 10 })]

// , async (req, res) => {

//     console.log("Received request for SuperAdmin:", req.body);

//     try {

//         const existingSuperAdmin = await SuperAdmin.findOne({ email: req.body.email });
//         if (existingSuperAdmin) {
//             console.log("Email already Registered");
//             return res.status(400).json({ success: false, error: "Email Already Registered" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);

//         const newSuperAdmin = new SuperAdmin({
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword,
//             contact: req.body.contact
//         });

//         await newSuperAdmin.save();                                                                 // Save the new Superadmin to the database

//         console.log("SuperAdmin created successfully");
//         return res.json({ success: true }); 

//     } catch (error) {
//         console.error("Error creating Superadmin:", error); 
//         return res.status(500).json({ success: false, error: "Internal Server Error" }); 
//     }
// });


router.post("/loginSuperAdmin", async (req, res) => {

    let email = req.body.email;                                                                     // Get email from request body

    try {
        let SuperAdminData = await SuperAdmin.findOne({ email });                                               

        if (!SuperAdminData) {
            return res.status(400).json({ errors: "Incorrect Email or password" });                
        }

        const passwordCompare = await bcrypt.compare(req.body.password, SuperAdminData.password);      

        if (!passwordCompare) {
            return res.status(400).json({ errors: "Incorrect email or password" });            
        }

        const data = { SuperAdmin: {id: SuperAdminData.id} };

        const authToken = jwt.sign(data, jwtSecret);                                                // Generate JWT token
        return res.json({ success: true, authToken: authToken });                                   // Send success response with token

    } catch (error) {
        console.log(error);
        res.json({ success: false });                                                     
    }
});

module.exports = router;    