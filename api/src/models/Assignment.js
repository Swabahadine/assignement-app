const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    dateDeRendu: { type: Date, required: true },
    nom: {type: String, required: true},
    rendu: {type: Boolean, default: false },
    author: {type: String, required: true},
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    report: { type: String },
    note: { type: Number, min:0, max:20 },
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
