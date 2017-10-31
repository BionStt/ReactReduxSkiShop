import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers/reducers';


export default function configureStore(initialState, historyMiddleware) {
    const store = createStore(reducers, initialState,
        applyMiddleware(historyMiddleware, ReduxThunk));

    if (module.hot) {
        module.hot.accept('./reducers/reducers',
            () =>
            store.replaceReducer(require('./reducers/reducers').default)
        );
    }

    return store;
} 




