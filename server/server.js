const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const auth = require('./routes/auth');
const homepage = require('./routes/homepage');
const userpage = require('./routes/user');
const path = require('path')

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api', auth);
app.use('/api', homepage);
app.use('/api', userpage)

app.get('/home', (req, res) => {
    res.send('Welcome to the page!');
})

const mongoEndpoint = 'mongodb+srv://root:0000@webdev.kr33m.mongodb.net/?retryWrites=true&w=majority&appName=WebDev';
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

let frontend_dir = path.join(__dirname, '..', 'client', 'dist')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});


app.listen(process.env.PORT || 8000, function() {
    console.log("Starting server now...")
})