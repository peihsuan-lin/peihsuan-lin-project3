const mongoose = require("mongoose");

const StatusUpdateSchema = require('../schemas/StatusUpdateSchema').StatusUpdateSchema;
const StatusUpdateModel = mongoose.model("StatusUpdate", StatusUpdateSchema);

function createStatusUpdate(status) {
    return StatusUpdateModel.create(status);
}

async function findStatusByUsername(username) {
    const user = await StatusUpdateModel.find({ username }).sort({ timestamp: -1 }).exec();
    return user;
}

async function getAllUpdates() {
    return await StatusUpdateModel.find().sort({ timestamp: -1 }).exec();
}

async function updateStatusById(Id, newContent) {
    return await StatusUpdateModel.findByIdAndUpdate(
        Id,
        { 
            content: newContent,
            timestamp: new Date()
        },
        { new: true }
    ).exec();
}

module.exports = {
    createStatusUpdate,
    findStatusByUsername,
    getAllUpdates,
    updateStatusById
};