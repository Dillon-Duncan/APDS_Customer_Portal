const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: String,
    idNumber: String,
    accountNumber: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);