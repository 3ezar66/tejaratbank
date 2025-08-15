import accountService from '../../services/accountService';
import { getFixedBalance } from '../../utils/balanceUtils';

export const setActiveAccount = (accountNumber, balance = null) => ({
  type: 'SET_ACTIVE_ACCOUNT',
  payload: {
    accountNumber,
    balance: getFixedBalance()
  }
});

export const refreshBalance = (accountNumber) => async (dispatch) => {
  try {
    dispatch({ type: 'REFRESH_BALANCE_REQUEST' });
    
    // Always use fixed balance regardless of API response
    const fixedBalance = getFixedBalance();
    
    dispatch({
      type: 'REFRESH_BALANCE_SUCCESS',
      payload: fixedBalance
    });
    
    dispatch({
      type: 'UPDATE_ACCOUNT_BALANCE',
      payload: {
        accountNumber,
        balance: fixedBalance
      }
    });
    
    return fixedBalance;
  } catch (error) {
    dispatch({
      type: 'REFRESH_BALANCE_FAILURE',
      payload: error.message
    });
    throw error;
  }
};

export const getAccounts = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_ACCOUNTS_REQUEST' });
    
    const response = await accountService.getAccounts();
    
    // Ensure all accounts have fixed balance
    const accountsWithFixedBalance = response.result.accounts.map(account => ({
      ...account,
      balance: getFixedBalance()
    }));
    
    dispatch({
      type: 'GET_ACCOUNTS_SUCCESS',
      payload: accountsWithFixedBalance
    });
    
    return response;
  } catch (error) {
    dispatch({
      type: 'GET_ACCOUNTS_FAILURE',
      payload: error.message
    });
    throw error;
  }
};

export const updateAccount = (accountData) => async (dispatch) => {
  try {
    const response = await accountService.updateAccount(accountData);
    
    dispatch({
      type: 'UPDATE_ACCOUNT_SUCCESS',
      payload: {
        ...response.result,
        balance: getFixedBalance()
      }
    });
    
    return response;
  } catch (error) {
    throw error;
  }
};