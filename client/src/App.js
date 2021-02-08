import React, { useCallback, useEffect, useState } from 'react';
import {
	HashRouter,
} from 'react-router-dom';
import {
	QueryClient,
	QueryClientProvider,
} from 'react-query';

import Routes from './Routes';

import { UserContext } from './context/UserContext';
import { getUser, updateUser } from './lib/localstorage/userStorage';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-jsonschema-form-validation/dist/react-jsonschema-form-validation.css';
import '@fortawesome/fontawesome-free/css/all.css';

const queryClient = new QueryClient();

const App = () => {
	const [user, setUser] = useState({});

	const updateUserContext = useCallback((newUser) => {
		setUser(newUser);
		updateUser(newUser);
	}, []);

	useEffect(() => {
		setUser(getUser());
	}, [setUser]);

	return (
		<UserContext.Provider value={[user, updateUserContext]}>
			<HashRouter>
				<QueryClientProvider client={queryClient}>
					<Routes />
				</QueryClientProvider>
			</HashRouter>
		</UserContext.Provider>
	);
};

export default App;
