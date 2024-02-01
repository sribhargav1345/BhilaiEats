// const express = require('express');
// const router = express.Router()

// const AddMilk = require('../../models/Add_item');
                                                                   
// router.post("/Add_milkshake" , async (req, res) => {

//     console.log("Received request:", req.body);

//     try {
//         const newAddMilk = new AddMilk({
//             CategoryName: req.body.CategoryName,
//             name: req.body.name, 
//             img: req.body.img,
//             options: req.body.options,
//         });

//         await newAddMilk.save(); // Save the new AddMilk to the database

//         return res.json({ success: true }); // Send success response

//     } catch (error) {
//         console.error("Error creating AddMilk:", error); // Log any errors
//         return res.status(500).json({ success: false, error: "Internal Server Error" }); // Send failure response
//     }
// });