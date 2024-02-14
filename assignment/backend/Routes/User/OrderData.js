const express = require('express');
const router = express.Router()
const Order = require('../../models/Orders');


router.post('/orderData', async (req,res) => {

    let data = req.body.order_data
    await data.splice(0,0, { Order_date: req.body.order_date })

    let eId = await Order.findOne({ 'email': req.body.email })      
    console.log(eId);

//     if(eId === null)
//     {
//         try{
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data]
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         }

//         catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)
//         }
//     }

//     else 
//     {
//         try {
//             await Order.findOneAndUpdate({ email: req.body.email },
//                 {
//                     $push: { order_data: data } }).then (() => {
//                         res.json( { success: true });
//                 })
//         }
//         catch(error) {
//             res.send("Server Error", error.message );
//         }
//     }
// })

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        data.splice(0, 0, { Order_date: req.body.order_date });

        // Retrieve the items from the client-side (assuming it's stored in the state)
        const cartItems = data.map(item => item.name); // Adjust this based on your actual data structure

        // If email doesn't exist in db then create, else update the existing record
        let userOrder = await Order.findOne({ 'email': req.body.email });

        if (!userOrder) {
            // User doesn't exist in the database, create a new record
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
        } else {
            // User exists, update the existing record
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
        }

        // Now, you can handle the cart items as needed (e.g., store them in a separate collection)
        // You might want to create a new model for the cart items and store them accordingly
        // For simplicity, let's assume you have a CartItem model
        // Update this part based on your actual data structure

        // Example: Create a CartItem model
        // const CartItem = require('../../models/CartItem');

        // Store cart items in the CartItem model
        // await CartItem.create({
        //     email: req.body.email,
        //     items: cartItems
        // });

        res.json({ success: true });
    } catch (error) {
        console.error("Server Error during orderData:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/myorderData', async (req,res) => {
    try {
        let myData = await Order.findOne({'email': req.body.email});
        res.json({orderData:myData})
    }
    catch(error)
    {
        res.send("Server Error:", error.message);
    }

})

module.exports = router;