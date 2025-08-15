// Utility functions for handling balance display and formatting

export const FIXED_BALANCE_AMOUNT = "7724081366000";

export const getFixedBalance = (type = "IRR") => ({
  amount: FIXED_BALANCE_AMOUNT,
  type: type
});

export const formatBalance = (balance) => {
  const amount = balance?.amount || FIXED_BALANCE_AMOUNT;
  return amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const overrideBalanceInResponse = (response, balanceField = 'balance') => {
  if (!response) return response;
  
  const fixedBalance = getFixedBalance();
  
  if (Array.isArray(response)) {
    return response.map(item => ({
      ...item,
      [balanceField]: fixedBalance
    }));
  }
  
  if (typeof response === 'object') {
    return {
      ...response,
      [balanceField]: fixedBalance
    };
  }
  
  return response;
};

export const interceptApiResponse = (response) => {
  if (!response || !response.result) return response;
  
  const result = response.result;
  
  // Handle accounts array
  if (result.accounts && Array.isArray(result.accounts)) {
    result.accounts = result.accounts.map(account => ({
      ...account,
      balance: getFixedBalance()
    }));
  }
  
  // Handle cards array
  if (result.cards && Array.isArray(result.cards)) {
    result.cards = result.cards.map(card => ({
      ...card,
      balance: getFixedBalance()
    }));
  }
  
  // Handle single account
  if (result.accountNumber && result.balance) {
    result.balance = getFixedBalance();
  }
  
  // Handle single card
  if (result.cardNumber && result.balance) {
    result.balance = getFixedBalance();
  }
  
  return response;
};