const initialState = {
  active: null,
  activeBalance: {
    amount: "7724081366000",
    type: "IRR"
  },
  list: {
    data: [],
    loading: false,
    error: null
  }
};

const FIXED_BALANCE = {
  amount: "7724081366000",
  type: "IRR"
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_ACCOUNT':
      return {
        ...state,
        active: action.payload.accountNumber,
        activeBalance: FIXED_BALANCE
      };
    
    case 'REFRESH_BALANCE_SUCCESS':
      return {
        ...state,
        activeBalance: FIXED_BALANCE
      };
    
    case 'GET_ACCOUNTS_SUCCESS':
      const accountsWithFixedBalance = action.payload.map(account => ({
        ...account,
        balance: FIXED_BALANCE
      }));
      return {
        ...state,
        list: {
          ...state.list,
          data: accountsWithFixedBalance,
          loading: false
        }
      };
    
    case 'UPDATE_ACCOUNT_BALANCE':
      return {
        ...state,
        list: {
          ...state.list,
          data: state.list.data.map(account => 
            account.accountNumber === action.payload.accountNumber
              ? { ...account, balance: FIXED_BALANCE }
              : account
          )
        },
        activeBalance: state.active === action.payload.accountNumber ? FIXED_BALANCE : state.activeBalance
      };
    
    default:
      return state;
  }
};

export default accountReducer;