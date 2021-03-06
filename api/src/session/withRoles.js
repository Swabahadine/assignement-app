const {
	unauthorized,
} = require('@hapi/boom');
const { compose } = require('compose-middleware');

const userService = require('../services/User');
const { USER_ROLE } = require('../lib/enums');

const withAuth = async (req, res, next) => {
	const auth = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString('utf-8');
	const [username, password] = auth.split(':').map((item) => Buffer.from(item, 'base64').toString('utf8'));
	const user = await userService.findByUsername(username);
	if (!user) {
		next(unauthorized(`L'identifiant ${username} n\'existe pas.`));
	}
	if (user.password !== password){
		next(unauthorized('Indentifiants incorrects.'));
	}
	req.session = req.session || {};
	req.session.user = user;
	next()

};

const withAdmin = compose([
	withAuth,
	(req, res, next) => {
		const { user } = req.session;
		if (user.role === 'ADMIN') {
			return next();
		}
		return next(unauthorized('Forbidden.'));
	},
]);

exports.withAuth = withAuth;
exports.withAdmin = withAdmin;
