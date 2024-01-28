const express = require('express');
const router = express.Router()
const User = require('../models/User')

const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "GunturKaramBokka"

router.post("/CreateUser", [
    body('email', 'Email Format is not correct').isEmail(),
    body('name').isLength({ min: 4 }),
    body('password', 'Incorrect Password').isLength({ min: 7 })]      // password should be of atleast 7 in length

    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            })

            res.json({ success: true });
        }
        catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })


 // We will use json web token at the time of login 
router.post("/loginUser", async (req, res) => {

    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({ errors: "Incorrect email or password" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Incorrect email or password" });
        }
        
        const data = {
            user:{
                id:userData.id
            }
        }
        
        const authToken = jwt.sign(data,jwtSecret)          // I didn't understand the part of json Web token , have to revise it
        return res.json({ success: true, authToken:authToken });
    }

    catch (error) {
        console.log(error)
        res.json({ success: false });
    }
})

module.exports = router;