const express = require('express');
const mongoDB = require('../../../db');
const router = express.Router();

router.get('/foodData_Milkshakes', async (req, res) => {
    try {      
        await mongoDB();

        const milkshakes = global.milkshakes;
        const milkshakesCat = global.milkshakesCat;

        console.log([milkshakes, milkshakesCat]);
        res.send([milkshakes, milkshakesCat]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
