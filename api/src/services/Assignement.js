const Assignment = require('../models/Assignment');

exports.create = (data) => Assignment.create(data);

exports.findById = (id) => Assignment.findOne({ id });

exports.findAll = (arg) => Assignment.find(arg).populate('subject');

exports.update = async (_id, props) => Assignment.updateOne({ _id }, { $set: props });

exports.delete = (id) => Assignment.deleteOne({ _id: id });
