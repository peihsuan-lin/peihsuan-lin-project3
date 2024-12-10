const Schema = require('mongoose').Schema;

exports.UserSchema = Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
}, { collection : 'user' });