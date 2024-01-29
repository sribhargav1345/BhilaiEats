const express = require('express');
const router = express.Router();

router.get('/shop/65b660d325d1fac6691e3ad0', async (req, res) => {
    try {
        //console.log(global.foods);
        res.send([global.foods, global.foodCategories]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;