import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';

const middleware = [];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

export default store;
