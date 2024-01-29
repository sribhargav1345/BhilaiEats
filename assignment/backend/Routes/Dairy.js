const express = require('express');
const router = express.Router();

router.get('/shop/65b65f8b25d1fac6691e3ace', async (req, res) => {
    try {
        //console.log(global.foods);
        res.send([global.foods, global.foodCategories]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
