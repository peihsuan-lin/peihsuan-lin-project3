const mongoose = require("mongoose");

const UserSchema = require('./schemas/UserSchema').UserSchema;

const UserModel = mongoose.model("User", UserSchema);