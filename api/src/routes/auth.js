const express = require('express');
const { validator, wrapAsync: wa } = require('express-server-app');
const { notFound, unauthorized } = require('@hapi/boom');

const userService = require('../services/User');

const router = express.Router();
router.get('/',
	wa(async (req, res) => {
		res.json('hello')
	}));
router.post('/sign-up',
	// withToken,
	// validator().validate({
	// 	body: {
	// 		type: 'object',
	// 		additionalProperties: false,
	// 		properties: {
	// 			id: { type: 'string' },
	// 		},
	// 		required: ['id'],

	// 	},
	// }),
	wa(async (req, res) => {
		const auth = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString('utf-8');
		const [username, password] = auth.split(':').map((item) => Buffer.from(item, 'base64').toString('utf8'));
		console.log('Authentification !!!', auth);
		console.log('id', username, password);
		await userService.create({
			username,
			password,
			role: 'ADMIN',
		});
		res.json('ok')
	}));

router.post('/login',
	// withToken,
	// validator().validate({
	// 	body: {
	// 		type: 'object',
	// 		additionalProperties: false,
	// 		properties: {
	// 			id: { type: 'string' },
	// 		},
	// 		required: ['id'],

	// 	},
	// }),
	wa(async (req, res) => {
		const auth = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString('utf-8');
	const [username, password] = auth.split(':').map((item) => Buffer.from(item, 'base64').toString('utf8'));
	console.log('Authentification !!!', auth);
	console.log('id', username, password);
	const user = await userService.findByUsername(username);
	// username not exist
	if (!user) {
		throw unauthorized(`L'identifiant ${username} n\'existe pas.`);
	}
	if (user.password !== password){
		throw unauthorized('Indentifiants incorrects.')
	}
	res.json(user);
}));

module.exports = router;
