import { encodeAuthBase64 } from '../lib/authentication';
import request from '../lib/request';

const API_PATH_NAME = 'http://localhost:8010/api/authentification';

export const fetchAuth = ({ username, password }) => {
	global.rollbar.info(`${username}, ${password}, ${encodeAuthBase64({ username, password }).username}`);
	return request(API_PATH_NAME, {
		auth: encodeAuthBase64({ username, password }),
		method: 'POST',
	});
};
