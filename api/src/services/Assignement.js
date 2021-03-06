const Assignment = require('../models/Assignment');

exports.create = (data) => Assignment.create(data);

exports.findById = (_id) => Assignment.findOne({ _id }).populate('subject');

exports.findAll = (arg) => Assignment.find(arg).populate('subject');

exports.update = async (_id, props) => Assignment.findOneAndUpdate({ _id }, { $set: props });

exports.delete = (id) => Assignment.deleteOne({ _id: id });
