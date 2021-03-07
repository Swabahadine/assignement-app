import { getAuth } from '../lib/authentication';
import request from '../lib/request';

const API_PATH_NAME = 'http://localhost:8010/api/assignments';

export const getAssignements = () => request(API_PATH_NAME, {
	auth: getAuth(),
	method: 'GET',
});

export const getOneAssignement = ({ queryKey: [, { id }] }) => request(`${API_PATH_NAME}/${id}`, {
	auth: getAuth(),
	method: 'GET',
});

export const postAssignements = (data) => request(API_PATH_NAME, {
	auth: getAuth(),
	method: 'POST',
	body: data,
});

export const putNotationOneAssignement = (data) => request(`${API_PATH_NAME}/notation/${data.id}`, {
	auth: getAuth(),
	method: 'PUT',
	body: data,
});
