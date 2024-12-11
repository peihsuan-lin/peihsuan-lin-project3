const mongoose = require("mongoose");

const UserSchema = require('../schemas/UserSchema').UserSchema;

const UserModel = mongoose.model("User", UserSchema);

function createUser(user) {
    return UserModel.create(user);
}

async function findUserByUsername(username) {
    const user = await UserModel.findOne({ username: username }).exec();
    return user;
}

module.exports = {
    createUser,
    findUserByUsername
};