const express = require('express');
const router = express.Router();
const StatusUpdateModel = require('../models/StatusUpdates');

router.get('/user/:username', async function (req, res) {
    const { username } = req.params;
    try {
        const userUpdates = await StatusUpdateModel.findStatusByUsername(username);
        return res.status(200).json({
            success: true,
            userUpdates
        })
    } catch (error) {
        console.error(`Error fetching updates for user ${username}:`, error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
)
module.exports = router;