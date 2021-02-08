import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import { getAuth } from './authentication';

const PrivateRoute = ({
	component: Component,
	...rest
}) => {
	const auth = getAuth();
	if (!auth) return (<Redirect to={{ pathname: '/login' }} />);
	return (
		<Route
			{...rest}
			render={(props) => (<Component {...props} />)}
		/>
	);
};

// PrivateRouteBorne.contextType = UserContext;

PrivateRoute.propTypes = {
	component: PropTypes.oneOfType([PropTypes.func, PropTypes.symbol]).isRequired,
};

export default PrivateRoute;
