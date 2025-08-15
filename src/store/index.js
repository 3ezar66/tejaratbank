import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import accountReducer from './reducers/accountReducer';
import cardReducer from './reducers/cardReducer';
import loginReducer from './reducers/loginReducer';
import balanceMiddleware from '../middleware/balanceMiddleware';

const rootReducer = combineReducers({
  account: accountReducer,
  card: cardReducer,
  login: loginReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, balanceMiddleware)
);

export default store;