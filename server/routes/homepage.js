const express = require('express');
const router = express.Router();
const StatusUpdateModel = require('../models/StatusUpdates');
const jwtHelpers = require('../helpers/jwt');

router.get('/home', async function (req, res) {
    try {
        const updates = await StatusUpdateModel.getAllUpdates();
        res.status(200).json({
            success: true,
            updates
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching status updates'
        });
    }
})
router.post('/home', async function(req, res){
    const newUpdate = {};
    const token = req.cookies.userToken;
    newUpdate.username = jwtHelpers.decrypt(token);
    newUpdate.content = req.body.content;
    const newUpdateDbResponse = await StatusUpdateModel.createStatusUpdate(newUpdate);
    return res.status(201).json({
        success: true,
        message: 'Status update created successfully',
        update: newUpdateDbResponse
    });
    
})
module.exports = router;