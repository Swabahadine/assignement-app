const User = require('../models/User');

exports.create = (data) => User.create(data);

exports.findAll = (arg) => User.find(arg);

exports.findByUsername = (username) => User.findOne({ username });

exports.deleteByUsername = (username) => User.deleteOne({ username });
