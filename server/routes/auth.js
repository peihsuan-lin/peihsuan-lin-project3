const express = require('express');
const router = express.Router();
const userModel = require('../models/Users');
const jwtHelpers = require('../helpers/jwt');

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
            const token = jwtHelpers.generateToken(username);
            res.cookie('userToken', token);
            return res.status(200).json({
                success: true,
                message: 'Log in successful',
                token
            });
        }
        res.status(400);
        return res.send('Password is not valid');
    } catch (error) {
        res.status(400);
        return res.send('Username or password invalid');
    }
})

router.post('/logout', async function (req, res) {
    res.clearCookie('userToken');
    res.send();
})

router.get('/status', async function (req, res) {
    try {
        const token = req.cookies.userToken;
        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }
        
        const username = jwtHelpers.decrypt(token);
        if (!username) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.json({ username });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

module.exports = router;