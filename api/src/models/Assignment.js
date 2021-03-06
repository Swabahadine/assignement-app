const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
