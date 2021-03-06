const mongoose = require('mongoose');

const { USER_ROLE } = require('../lib/enums');

const userSchema = new mongoose.Schema({
    username: { type: String },
	password: { type: String },
	role: {
        type: String,
        enum : Object.keys(USER_ROLE),
        default: 'USER',
        required: true,
    },
});

module.exports = mongoose.model('User', userSchema);
