const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');      

const food_Milkshakes = require('../../../models/Milkshakes/Add_item');
const food_MilkshakesCat = require('../../../models/Milkshakes/Add_itemCat');

router.post("/CreateFood_Milkshakes", [

    body('categoryname').isEmail(),                                       
    body('name').isLength({ min: 3 }),                                                 
    body('image').isLength({ min: 5 }),                              
    body('options').isArray({ min: 1 })]

, async (req, res) => {

    console.log("Item Adding Request:", req.body);

    try {

        const existingfood_Milkshakes = await food_Milkshakes.findOne({ name: req.body.name });
        const exisitingfood_MilkshakesCat = await food_MilkshakesCat.findOne({ categoryname: req.body.categoryname });

        if (existingfood_Milkshakes) {
            console.log("Food Item aldready present");
            return res.status(400).json({ success: false, error: "Food Item Aldready Present" });
        }

        const newfood_Milkshakes = new food_Milkshakes({
            categoryname: req.body.categoryname,
            name: req.body.name,
            image: req.body.image,
            options: req.body.options
        });

        await newfood_Milkshakes.save(); 

        if(!exisitingfood_MilkshakesCat) {

            const newfood_MilkshakesCat = new food_MilkshakesCat({
                categoryname: req.body.categoryname,
            });

            await newfood_MilkshakesCat.save();
        }

        console.log("food_Milkshakes created successfully");
        return res.json({ success: true }); 

    } catch (error) {
        console.error("Error creating food_Milkshakes:", error); 
        return res.status(500).json({ success: false, error: "Internal Server Error" }); // Send failure response
    }
});

module.exports = router;    