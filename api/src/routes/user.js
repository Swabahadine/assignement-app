const express = require('express');
const { validator, wrapAsync: wa } = require('express-server-app');
const { USER_ROLE } = require('../lib/enums');
const userServices = require('../services/User');
const { withAdmin } = require('../session/withRoles');

const router = express.Router();

router.get('/',
	withAdmin,
	wa(async (req, res) => {
		const user = await userServices.findAll();
		res.json(user);
	}));

router.get('/teachers',
	withAdmin,
	wa(async (req, res) => {
		const user = await userServices.findAll({ role: USER_ROLE.TEACHER });
		res.json(user);
	}));

router.get('/:username',
	withAdmin,
	wa(async (req, res) => {
		const user = await userServices.findByUsername(req.params.username);
		res.json(user);
	}));

router.delete('/:username',
	withAdmin,
	wa(async (req, res) => {
		const { username } = req.params;
		const assignement = await userServices.delete(username)
		res.json(assignement);
	}));

module.exports = router;
