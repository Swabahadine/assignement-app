const express = require('express');
const { validator, wrapAsync: wa } = require('express-server-app');
const assServices = require('../services/Assignement');

const router = express.Router();

router.get('/',
	wa(async (req, res) => {
		const assignements = await assServices.findAll();
		res.json(assignements);
	}));


router.post('/',
	wa(async (req, res) => {
		const assignement = await assServices.create(req.body)
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
