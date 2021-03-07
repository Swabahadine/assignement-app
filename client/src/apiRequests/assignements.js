import { getAuth } from '../lib/authentication';
import request from '../lib/request';

const API_PATH_NAME = 'http://localhost:8010/api/assignments';

export const getAssignements = () => request(API_PATH_NAME);

export const postAssignements = (data) => request(API_PATH_NAME, {
	auth: getAuth(),
	method: 'POST',
	body: data,
});
