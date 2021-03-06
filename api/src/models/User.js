const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String },
	password: { type: String },
	role: {
        type: String,
        enum : ['USER','ADMIN'],
        default: 'USER',
        required: true,
    },
});

module.exports = mongoose.model('User', userSchema);
