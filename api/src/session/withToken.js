const {
	unauthorized,
} = require('@hapi/boom');

const decode = (token) => token;

const withToken = (req, res, next) => {
	const auth = decode(req.headers.authorization);
	if (auth) {
		req.session = req.session || {};
		req.session.token = auth;
		next();
	} else {
		next(unauthorized('Forbidden.'));
	}
};

exports.withToken = withToken;
