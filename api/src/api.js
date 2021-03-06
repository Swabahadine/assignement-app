const { config, log } = require('express-server-app');
const express = require('express');

const allRoutes = require('./routes');

const api = express.Router();
const logger = log();

const urls = Object.keys(allRoutes);
const prefix = 'api';
logger.info(`Liste des routes:${urls.map((url) => ` ${prefix}/${url}`)}`);
urls.forEach((url) => {
	api.use(`/${prefix}/${url}`, allRoutes[url]);
});

api.use((req, res, next) => {
	res.header('X-Robots-Tag', 'none');
	next();
});

api.use('/check', (req, res) => {
	res.json('Hello ! You are using Swabahadine Assignement API.');
});

module.exports = api;
