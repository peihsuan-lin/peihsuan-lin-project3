const express = require('express');
const router = express.Router();
const userModel = require('../models/Users')


router.post('/signup', async function (req, res) {
    console.log('Request body:', req.body); 
    try {
        await userModel.createUser(req.body);
        console.log('in the sign up backend')
        return res.status(200).send('Successfully created user, logged in');
    } catch (error) {
        res.status(404);
        return res.send('Error creating new user');
    }
})

module.exports = router;