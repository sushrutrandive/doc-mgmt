import appReducer from './AppReducer';
import  rootSaga  from './AppSaga'


import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

const rootReducer  = combineReducers({appState:appReducer});
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga)

export {store};