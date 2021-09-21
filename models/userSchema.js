const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

// Defining Schema for Users
const userSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, "UserID is compulsory."],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Please have a name."],
        default: "user"
    }
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);