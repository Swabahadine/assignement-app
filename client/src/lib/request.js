const axios = require('axios');

const reportServerErrors = (error) => {
	if ([422, 500].includes(error.response?.status) && global.rollbar) {
		global.rollbar.error(
			`A ${error.response?.status} server error occured`,
			new Error(error.message),
			{
				request: error?.request,
				serverError: error,
			},
		);
	}
};

const send = async (path, opts) => {
	const options = {
		...opts,
		headers: {
			...opts?.headers,
		},
	};
	const { method } = options;
	const body = options.body || {};
	delete options.method;
	delete options.body;
	switch (method) {
	case 'POST':
		return axios.post(path, body, options);
	case 'PUT':
		return axios.put(path, body, options);
	case 'DELETE':
		return axios.del(path, body, options);
	default:
		return axios.get(path, options);
	}
};

const request = (path, opts) => {
	const options = {
		...opts,
		headers: {
			...opts?.headers,
		},
	};
	// Add Content-Type only if not multipart to allow fetch api to add correct boundary
	if (!(options.body instanceof FormData)) {
		options.headers['Content-Type'] = 'application/json';
	}

	return send(path, options).catch((error) => {
		// eslint-disable-next-line no-console
		console.error(error);
		let err = {};
		// catch server message
		// https://stackoverflow.com/questions/49633463/how-to-handle-api-errors-using-aws-amplify
		if (error.response) {
			// client received an error response (5xx, 4xx)
			//error.message = error.response?.data?.message;
			err = {
				...error,
				message: error.response?.data?.message,
				reason: error.response?.data?.reason,
			};
			reportServerErrors(error);
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			err.message = 'request error';
			err.details = error.request;
		} else if (typeof error === 'string') {
			err.message = error;
			// Something happened in setting up the request that triggered an Error
		} else {
			err = { ...error, message: 'error' };
		}
		throw err;
	}).then(({ data }) => data);
};

export default request;
