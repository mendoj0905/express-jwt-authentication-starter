const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    isAdmin: Boolean
});

mongoose.model('User', UserSchema);