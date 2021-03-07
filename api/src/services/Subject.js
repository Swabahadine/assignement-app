const Subject = require('../models/Subject');

exports.create = (data) => Subject.create(data);

exports.findById = (id) => Subject.findOne({ id });

exports.findByTeacherId = (teacherId) => Subject.findOne({ teacherId });

exports.findAll = (arg) => Subject.find(arg);

exports.update = async (_id, props) => Subject.updateOne({ _id }, { $set: props });

exports.delete = (id) => Subject.deleteOne({ _id: id });
