const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: { type: String },
    teacher: {type: String },
    teacherId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Subject', SubjectSchema);
