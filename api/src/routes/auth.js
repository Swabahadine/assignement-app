const express = require('express');
const { validator, wrapAsync: wa } = require('express-server-app');
const { notFound, unauthorized } = require('@hapi/boom');

const { withAuth } = require('../session/withRoles');

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
	withAuth,
	wa(async (req, res) => {
		const { user } = req.session;
		res.json(user);
}));

module.exports = router;
