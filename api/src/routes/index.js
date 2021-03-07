const auth = require('./auth');
const assignments = require('./assignments');
const subjects = require('./subject');
const users = require('./user');

module.exports = {
	authentification: auth,
	assignments,
	subjects,
	users,
};
