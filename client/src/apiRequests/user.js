import { getAuth } from '../lib/authentication';
import request from '../lib/request';

const API_PATH_NAME = 'http://localhost:8010/api/users';

export const getUsers = () => request(API_PATH_NAME, {
	auth: getAuth(),
});

export const getTeachers = () => request(`${API_PATH_NAME}/teachers`, {
	auth: getAuth(),
});

export const getOneUser = (username) => request(`${API_PATH_NAME}/${username}`, {
	auth: getAuth(),
});

export const deleteUser = (username) => request(`${API_PATH_NAME}/${username}`, {
	auth: getAuth(),
	method: 'DELETE',
});
