const express = require('express');
const mongoDB = require('../../db');
const router = express.Router();

router.get('/shopData', async (req, res) => {
    try {
        await mongoDB();

        res.send([global.shops]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
