const express = require('express')
const app = express()
const mongoose = require('mongoose');
const auth = require('./routes/auth');

app.use('/', auth)

app.get('/home', (req, res) => {
    res.send('Welcome to the page!');
})

const mongoEndpoint = 'mongodb+srv://root:0000@webdev.kr33m.mongodb.net/?retryWrites=true&w=majority&appName=WebDev';
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.listen(5001);