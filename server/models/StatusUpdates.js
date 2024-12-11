const mongoose = require("mongoose");

const StatusUpdateSchema = require('../schemas/StatusUpdateSchema').StatusUpdateSchema;
const StatusUpdateModel = mongoose.model("StatusUpdate", StatusUpdateSchema);

function createStatusUpdate(status) {
    return StatusUpdateModel.create(status);
}

async function findStatusByUsername(username) {
    const user = await StatusUpdates.find({ username }).sort({ timestamp: -1 }).exec();
    return user;
}

async function getAllUpdates() {
    return await StatusUpdateModel.find().sort({ timestamp: -1 }).exec();
}

module.exports = {
    createStatusUpdate,
    findStatusByUsername,
    getAllUpdates
};