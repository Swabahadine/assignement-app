const express = require('express');
const { validator, wrapAsync: wa } = require('express-server-app');
const { notFound, unauthorized } = require('@hapi/boom');

const userService = require('../services/User');
const { USER_ROLE } = require('../lib/enums');

const router = express.Router();
router.get('/',
	wa(async (req, res) => {
		res.json('hello')
	}));
router.post('/sign-up',
	validator().validate({
		body: {
			type: 'object',
			properties: {
				username: { type: 'string' },
				password: { type: 'string' },
				role: { type: 'string', enum: Object.keys(USER_ROLE) },
			},
			required: ['username', 'password', 'role'],
		},
	}),
	wa(async (req, res) => {
		const { username: username64, password: pass64, role } = req.body;
		const username = Buffer.from(username64, 'base64').toString('utf8');
		const password = Buffer.from(pass64, 'base64').toString('utf8');
		
		const user = await userService.findByUsername(username);
		if (user) {
			throw unauthorized('Cet utilisateur a déjà été créé.')
		}
		await userService.create({
			username,
			password,
			role,
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
