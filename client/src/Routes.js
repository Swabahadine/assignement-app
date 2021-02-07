import React, { Suspense } from 'react';
import {
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import PageHome from './pages/Home';

const Routes = () => (
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
			<Route path="/home" component={PageHome} />
		</Switch>
	</Suspense>
);

export default Routes;
