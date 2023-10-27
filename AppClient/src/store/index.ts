import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history'; // https://www.npmjs.com/package/redux-first-history

import { rootSaga } from './rootSaga';
import rootReducer from './rootReducer';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer(routerReducer),
  middleware: [sagaMiddleware, routerMiddleware],
});

sagaMiddleware.run(rootSaga);

export const history = createReduxHistory(store);
export default store;
