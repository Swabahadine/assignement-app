import { getAuth } from '../lib/authentication';
import request from '../lib/request';

const API_PATH_NAME = 'http://localhost:8010/api/subjects';

export const getSubjects = () => request(API_PATH_NAME, {
	auth: getAuth(),
});

export const getOneSubject = (id) => request(`${API_PATH_NAME}/${id}`, {
	auth: getAuth(),
});

export const postSubject = (data) => request(API_PATH_NAME, {
	auth: getAuth(),
	method: 'POST',
	body: data,
});

export const putSubject = (data) => request(API_PATH_NAME, {
	auth: getAuth(),
	method: 'PUT',
	body: data,
});

export const deleteSubject = (id) => request(`${API_PATH_NAME}/${id}`, {
	auth: getAuth(),
	method: 'DELETE',
});
