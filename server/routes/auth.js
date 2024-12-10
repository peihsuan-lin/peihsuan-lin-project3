const express = require('express');
const router = express.Router();
const app = express();

app.get('/login', (req, res) => {
    const username = req.body.username
    const pwd = req.body.password
})
// app.get('/signup', (req, res) => {
    
// })

module.exports = router;