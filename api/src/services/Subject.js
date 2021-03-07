const Subject = require('../models/Subject');

exports.create = (data) => Subject.create(data);

exports.findById = (id) => Subject.findOne({ id });

exports.findByTeacher = (teacher) => Subject.find({ teacher });

exports.findAll = (arg) => Subject.find(arg);

exports.update = async (_id, props) => Subject.updateOne({ _id }, { $set: props });

exports.delete = (id) => Subject.deleteOne({ _id: id });
