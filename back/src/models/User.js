const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "email is a required field"],
    },

    password: {
        type: String,
        required: [true, "password is a required field"],
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = model("User", UserSchema);
