export const LOCAL_STORAGE_KEY = 'user';

export const updateUser = (auth) => (
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(auth))
);

export const clearUser = () => (
	localStorage.removeItem(LOCAL_STORAGE_KEY)
);

export const getUser = () => (
	JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}
);
