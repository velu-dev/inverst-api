const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profile_pic: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);