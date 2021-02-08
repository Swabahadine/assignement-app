import React, { Suspense, useContext } from 'react';
import {
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { UserContext } from './context/UserContext';
import PrivateRoute from './lib/PrivateRoute';

import PageHome from './pages/Home';
import PageLogin from './pages/Login';

/**
 * objet qui définit les caractéristiques des pages du menu de navigation
 */
const menuPages = {
	search: {
		home: ['ADMIN', 'USER'],
		Page: PageHome,
		path: '/home',
	},
};

// fonction qui gérère les différents path d'un rôle donné sous forme d'array
const generateRoutePath = (role) => (role ? Object.keys(menuPages)
	.filter((key) => menuPages[key].roles.includes(role))
	.map((key) => menuPages[key].path) : []);

// fonction qui gérère les différents pages d'un rôle donné sous forme d'array
const generateRoutePage = (role) => (role ? Object.keys(menuPages)
	.filter((key) => menuPages[key].roles.includes(role))
	.map((key) => menuPages[key]) : []);

const Routes = () => {
	const [user] = useContext(UserContext);

	const paths = generateRoutePath(user.role);
	const menuPagesRole = generateRoutePage(user.role);
	return (
		<Suspense
			fallback={(
				<div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
					<div className="w-50 mx-auto">
						Loading
					</div>
				</div>
			)}
		>
			<Switch>
				<Redirect exact from="/" to="/login" />
				<Route path="/login" component={PageLogin} />
				<Route path={paths}>
					{menuPagesRole.map(({ Page, path }) => (
						<PrivateRoute key={path} path={path} component={Page} />
					))}
				</Route>
				<Redirect exact from="*" to="/login" />
			</Switch>
		</Suspense>
	);
};

export default Routes;
