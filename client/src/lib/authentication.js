export const LOCAL_STORAGE_KEY = 'authentication';

export const encodeAuthBase64 = ({ username, password }) => {
	const usernameBase64 = btoa(username);
	const passBase64 = btoa(password);
	return {
		username: usernameBase64,
		password: passBase64,
	};
};

export const updateAuth = (auth) => (
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(encodeAuthBase64(auth)))
);

export const clearAuth = () => (
	localStorage.removeItem(LOCAL_STORAGE_KEY)
);

export const getAuth = () => (
	JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
);
