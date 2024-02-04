const express = require('express');
const router = express.Router();

router.get('/foodData_Milkshakes', async (req, res) => {
    try {
        res.send([global.milkshakes, global.milkshakesCat]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
