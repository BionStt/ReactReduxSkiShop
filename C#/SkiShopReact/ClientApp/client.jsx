import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetch } from 'domain-task';
import 'bootstrap/dist/css/bootstrap.css';

import configureStore from './configureStore';
import App from './components/App';

if (module.hot) {
    module.hot.accept();
}

const initialState = window.initialReduxState;

const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const store = configureStore(initialState, historyMiddleware);
//console.log(store.getState());

ReactDOM.render(
    <Provider store = {store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);