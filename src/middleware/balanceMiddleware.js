import { getFixedBalance } from '../utils/balanceUtils';

// Redux middleware to intercept and modify balance-related actions
const balanceMiddleware = (store) => (next) => (action) => {
  // Intercept balance-related actions and ensure fixed balance
  switch (action.type) {
    case 'SET_ACTIVE_ACCOUNT':
    case 'SET_ACTIVE_CARD':
      action.payload.balance = getFixedBalance();
      break;
      
    case 'REFRESH_BALANCE_SUCCESS':
    case 'REFRESH_CARD_BALANCE_SUCCESS':
      action.payload = getFixedBalance();
      break;
      
    case 'GET_ACCOUNTS_SUCCESS':
      if (Array.isArray(action.payload)) {
        action.payload = action.payload.map(account => ({
          ...account,
          balance: getFixedBalance()
        }));
      }
      break;
      
    case 'GET_CARDS_SUCCESS':
      if (Array.isArray(action.payload)) {
        action.payload = action.payload.map(card => ({
          ...card,
          balance: getFixedBalance()
        }));
      }
      break;
      
    case 'UPDATE_ACCOUNT_BALANCE':
    case 'UPDATE_CARD_BALANCE':
      action.payload.balance = getFixedBalance();
      break;
  }
  
  return next(action);
};

export default balanceMiddleware;