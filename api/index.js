const mongoose = require('mongoose');
const serverless = require('serverless-http');
const { log } = require('express-server-app');

const logger = log();
const app = require('./src/app');

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const database = process.env.MONGO_DATABASE;

const MGHOST = `mongodb+srv://${user}:${password}@${host}/${database}`;
logger.info('mongoose connection index ...');
const handler = serverless(app);
let conn = null;
// https://mongoosejs.com/docs/lambda.html
module.exports.handler = async (event, context) => {
	context.callbackWaitsForEmptyEventLoop = false;
	if (conn == null) {
		try {
			logger.info(`mongoose try to connect on ${MGHOST}`);
			conn = await mongoose.connect(MGHOST, {
				bufferCommands: false,
				bufferMaxEntries: 0,
				useCreateIndex: true,
				useUnifiedTopology: true,
				useNewUrlParser: true,
			});
			logger.info(`mongoose connected on ${MGHOST}`);
		} catch (error) {
			logger.error(`mongoose connection on ${MGHOST} error: ${error}`);
		}
	}

	const result = await handler(event, context);
	return result;
};
