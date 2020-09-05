const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: String,
    name: String,
});

module.exports = mongoose.model('Users', UserSchema);