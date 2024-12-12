const express = require('express');
const router = express.Router();
const StatusUpdateModel = require('../models/StatusUpdates');
const userModel = require('../models/Users');
const jwtHelpers = require('../helpers/jwt');

router.get('/user/:username', async function (req, res) {
    const { username } = req.params;
    const loggedInUser = jwtHelpers.decrypt(req.cookies.userToken);
    try {
        const userUpdates = await StatusUpdateModel.findStatusByUsername(username);
        const userInfo = await userModel.findUserByUsername(username);
        return res.status(200).json({
            success: true,
            userUpdates,
            createdAt: userInfo.createAt,
            isOwnProfile: loggedInUser === username
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

router.put('/user/:username/update/:updateId', async function (req, res) {
    const {updateId} = req.params;
    const {content} = req.body;

    try {
        const updateStatus = await StatusUpdateModel.updateStatusById(updateId, content);
        if (!updateStatus) {
            return res.status(404).json({
                success: false,
                message: 'Status update not found'
            });
        }
        res.status(200).json({
            success: true,
            update: updateStatus
        });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
)

module.exports = router;