const User = require('../models/User');

exports.create = (data) => User.create(data);

exports.findByUsername = (username) => User.findOne({ username });

exports.saveUser = async (_id, tag, User) => {
	return User.updateOne({ _id }, {
		$set: { Users: { [tag]: { [User]: { saved: true } } } },
	});
};

// exports.update = async (old, category, data) => {
// 	const props = {
// 		category,
// 		size: data.length,
// 		Users: data,
// 	};
// 	await old.set(props);
// 	//await old.save();
// 	return old;
// };

exports.update = async (_id, props) => User.updateOne({ _id }, { $set: props });

exports.delete = (id) => User.deleteOne({ _id: id });
