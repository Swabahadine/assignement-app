import React, { Suspense } from 'react';
import {
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { USER_ROLE } from './lib/api/enums';

import LeftSidebar from './components/menu/LeftSidebar';

import { getUser } from './lib/localstorage/userStorage';
import PrivateRoute from './lib/PrivateRoute';

import PageHome from './pages/Home';
import PageLogin from './pages/Login';
import PageSignUp from './pages/SignUp';
import PageSubject from './pages/Subject';

const { ADMIN, USER, TEACHER } = USER_ROLE;
/**
 * objet qui définit les caractéristiques des pages du menu de navigation
 */
const menuPages = {
	home: {
		roles: [ADMIN, USER, TEACHER],
		Page: PageHome,
		path: '/home',
	},
	PageSubject: {
		roles: [ADMIN],
		Page: PageSubject,
		path: '/subjects',
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
	const user = getUser();
	const role = user?.role;
	const paths = generateRoutePath(role);
	const menuPagesRole = generateRoutePage(role);
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
				<Redirect exact from="/" to="/home" />
				<Route path="/login" component={PageLogin} />
				<Route path="/sign-up" component={PageSignUp} />
				<Route path={paths}>
					<LeftSidebar>
						{menuPagesRole.map(({ Page, path }) => (
							<PrivateRoute key={path} path={path} component={Page} />
						))}
					</LeftSidebar>
				</Route>
				<Redirect exact from="*" to="/login" />
			</Switch>
		</Suspense>
	);
};

export default Routes;
