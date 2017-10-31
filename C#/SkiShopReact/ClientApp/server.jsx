import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ConnectedRouter, routerMiddleware, replace } from 'react-router-redux';
import createHistory from 'history/createMemoryHistory';
import { createServerRenderer } from 'aspnet-prerendering';
//import 'bootstrap/dist/css/bootstrap.css';

import configureStore from './configureStore';
import App from './components/App';
import { getStylesPopularClearanceAsync } from './actions/getPopularClearance';
import { getCategoriesAsync } from './actions/getCategories';


export default createServerRenderer(params => {
    return new Promise((resolve, reject) => {
        let initialState = {};
        const history = createHistory();
        const historyMiddleware = routerMiddleware(history);
        const store = configureStore(initialState, historyMiddleware);
        store.dispatch(replace(params.location));

        Promise.all([
            store.dispatch(getCategoriesAsync()),
            store.dispatch(getStylesPopularClearanceAsync())
        ])
        .then(() => {
            const app = (
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <App />
                    </ConnectedRouter>
                </Provider>
            );

            const html = renderToString(app);

            params.domainTasks.then(() => {
                    resolve({
                        html: html,
                        globals: { initialReduxState: store.getState() }
                    });
                },
                reject);
        });
        });
        
});

