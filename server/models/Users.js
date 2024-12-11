const mongoose = require("mongoose");

const UserSchema = require('../schemas/UserSchema').UserSchema;

const UserModel = mongoose.model("User", UserSchema);

function createUser(user) {
    return UserModel.create(user);
}

function findUserByUsername(username) {
    return UserModel.find({username: username}).exec();
}

module.exports = {
    createUser,
    findUserByUsername
};