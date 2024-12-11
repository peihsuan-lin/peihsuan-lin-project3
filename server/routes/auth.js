const express = require('express');
const router = express.Router();
const userModel = require('../models/Users')


router.post('/signup', async function (req, res) {
    try {
        await userModel.createUser(req.body);
        return res.status(200).send('Successfully created user, logged in');
    } catch (error) {
        res.status(404);
        return res.send('Error creating new user');
    }
})

router.post('/login', async function (req, res) {
    const username = req.body.username;
    const pwd = req.body.password;
    try {
        const user = await userModel.findUserByUsername(username);
        if (!user) {
            return res.status(400).send('Username invalid or not found')
        }
        if (user.password === pwd) {
            return res.status(200).send('Log in successful');
        }
        res.status(400);
        return res.send('Password is not valid');
    } catch (error) {
        res.status(400);
        return res.send('Username or password invalid');
    }
})

module.exports = router;