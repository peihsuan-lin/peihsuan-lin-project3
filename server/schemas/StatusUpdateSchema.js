const Schema = require('mongoose').Schema;

exports.StatusUpdateSchema = Schema({
    username: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: { 
        type: String
    }
}, { collection : 'status-update' });