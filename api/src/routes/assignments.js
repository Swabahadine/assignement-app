const express = require('express');
const { validator, wrapAsync: wa } = require('express-server-app');
const { USER_ROLE } = require('../lib/enums');
const assServices = require('../services/Assignement');
const subjectServices = require('../services/Subject');
const { notFound, unauthorized } = require('@hapi/boom');

const { withUser, withAuth, withTeacher } = require('../session/withRoles');

const router = express.Router();

router.get('/',
	withAuth,
	wa(async (req, res) => {
		const { role, username } = req.session.user;
		if (role === USER_ROLE.ADMIN) {
			const assignements = await assServices.findAll();
			res.json(assignements);
		}
		if (role === USER_ROLE.TEACHER) {
			const subjects = await subjectServices.findByTeacher(username)
			const assignements = await assServices.findAll({ subject: {$in:subjects} });
			res.json(assignements);
		}
		if (role === USER_ROLE.USER) {
			const assignements = await assServices.findAll({ author: username });
			res.json(assignements);
		}
	}));

router.get('/:id',
	withAuth,
	wa(async (req, res) => {
		const { id } = req.params;
		const { role, username } = req.session.user;
		const assignements = await assServices.findById(id);
		if (!assignements) {
			throw notFound('Not found.');
		}
		if (role === USER_ROLE.ADMIN) {
			res.json(assignements);
		}
		if (role === USER_ROLE.TEACHER) {
			const { teacher } = assignements.subject
			if (teacher !== username) {
				throw unauthorized('Ce devoir n\'est pas de votre matière');
			}
			res.json(assignements);
		}
		if (role === USER_ROLE.USER) {
			if (assignements.author !== username) {
				throw unauthorized('Ce devoir ne vous appartient pas') 
			}
			res.json(assignements);
		}
	}));


router.post('/',
	withUser,
	validator().validate({
		body: {
			type: 'object',
			additionalProperties: false,
			properties: {
				dateDeRendu: { type: 'string' },
				nom: { type: 'string'},
				rendu: { type: 'boolean', default: false },
				subject: { type: 'string' },
				report: { type: 'string' },
				note: { type: 'number', min:0, max:20 },
			},
			required: ['nom', 'subject', 'dateDeRendu'],
		},
	}),
	wa(async (req, res) => {
		const { user } = req.session;
		const author = user.username;
		const assignement = await assServices.create({ ...req.body, author })
		res.json(assignement);
	}));

router.put('/:id',
	wa(async (req, res) => {
		const { id } = req.params;
		const assignements = await assServices.findById(id);
		if (!assignements) {
			throw notFound('Not found.');
		}
		const assignementUpdated = await assServices.update(id, req.body)
		res.json(assignementUpdated);
	}));

router.put('/notation/:id',
	withTeacher,
	validator().validate({
		body: {
			type: 'object',
			additionalProperties: false,
			properties: {
				id : { type: 'string' },
				note: { type: 'number', minimum: 0, maximum: 20 },
				report: { type: 'string' },
			},
			required: ['note'],
		},
		params: {
			type: 'object',
			additionalProperties: false,
			properties: {
				id : { type: 'string' },
			},
			required: ['id'],
		},
	}),
	wa(async (req, res) => {
		const { id } = req.params;
		const { username } = req.session.user;
		const assignements = await assServices.findById(id);
		if (!assignements) {
			throw notFound('Not found.');
		}
		const { teacher } = assignements.subject
		if (teacher !== username) {
			throw unauthorized('Ce devoir n\'est pas de votre matière');
		}
		const props = {
			...req.body,
			rendu: true,
		}
		console.log('pros', props);
		const assignementUpdated = await assServices.update(id, props)
		res.json(assignementUpdated);
	}));
router.delete('/:id',
	wa(async (req, res) => {
		const { id } = req.params;
		const assignement = await assServices.delete(id)
		res.json(assignement);
	}));

module.exports = router;
