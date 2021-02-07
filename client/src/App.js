import React, {
	HashRouter,
} from 'react-router-dom';
import {
	QueryClient,
	QueryClientProvider,
} from 'react-query';

import Routes from './Routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-jsonschema-form-validation/dist/react-jsonschema-form-validation.css';

const queryClient = new QueryClient();

const App = () => (
	<HashRouter>
		<QueryClientProvider client={queryClient}>
			<Routes />
		</QueryClientProvider>
	</HashRouter>
);

export default App;
