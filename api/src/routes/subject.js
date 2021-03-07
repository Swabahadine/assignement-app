const express = require('express');
const { validator, wrapAsync: wa } = require('express-server-app');
const subjectServices = require('../services/Subject');
const { withAdmin, withAuth } = require('../session/withRoles');

const router = express.Router();

router.get('/',
	withAuth,
	wa(async (req, res) => {
		const assignements = await subjectServices.findAll();
		res.json(assignements);
	}));

router.get('/:id',
	withAdmin,
	wa(async (req, res) => {
		const assignements = await subjectServices.findById(req.params.id);
		res.json(assignements);
	}));

router.post('/',
	withAdmin,
	validator().validate({
		body: {
			type: 'object',
			additionalProperties: false,
			properties: {
				name: { type: 'string' },
				teacher: { type: 'string' },
				teacherId: { type: 'string' },
			},
			required: ['name', 'teacher', 'teacherId'],
		},
	}),
	wa(async (req, res) => {
		const assignement = await subjectServices.create(req.body)
		res.json(assignement);
	}));

router.put('/:id',
	withAdmin,
	wa(async (req, res) => {
		const { id } = req.params;
		const assignement = await subjectServices.update(id, req.body)
		res.json(assignement);
	}));

router.delete('/:id',
	withAdmin,
	wa(async (req, res) => {
		const { id } = req.params;
		const assignement = await subjectServices.delete(id)
		res.json(assignement);
	}));

module.exports = router;
