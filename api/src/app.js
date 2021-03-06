const {
	application,
	log,
} = require('express-server-app');

const api = require('./api');

log().debug('starting server.js');

const app = application()
	.useInitialMiddlewares({ forceHttps: false });

app.useRootRoute()
	.useHealthyRoute()
	.use('/', api)
	.useApiFinalMiddlewares();

module.exports = app;
