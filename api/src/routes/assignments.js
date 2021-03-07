const express = require('express');
const { validator, wrapAsync: wa } = require('express-server-app');
const assServices = require('../services/Assignement');
const { withUser } = require('../session/withRoles');

const router = express.Router();

router.get('/',
	wa(async (req, res) => {
		const assignements = await assServices.findAll();
		res.json(assignements);
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
		const assignement = await assServices.update(id, req.body)
		res.json(assignement);
	}));

router.delete('/:id',
	wa(async (req, res) => {
		const { id } = req.params;
		const assignement = await assServices.delete(id)
		res.json(assignement);
	}));

module.exports = router;
