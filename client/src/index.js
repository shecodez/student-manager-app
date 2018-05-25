import React from 'react';
import ReactDOM from 'react-dom';

import './styles/style.css';
import App from './App';
import DataLoader from './components/common/withDataLoader';

import registerServiceWorker from './utils/registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
const store = configureStore();

require('dotenv').config();

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<DataLoader>
				<Route component={App} />
			</DataLoader>
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

registerServiceWorker();
