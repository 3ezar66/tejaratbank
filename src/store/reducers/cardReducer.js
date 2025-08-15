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
  },
  destinations: []
};

const FIXED_BALANCE = {
  amount: "7724081366000",
  type: "IRR"
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_CARD':
      return {
        ...state,
        active: action.payload.cardNumber,
        activeBalance: FIXED_BALANCE
      };
    
    case 'REFRESH_CARD_BALANCE_SUCCESS':
      return {
        ...state,
        activeBalance: FIXED_BALANCE
      };
    
    case 'GET_CARDS_SUCCESS':
      const cardsWithFixedBalance = action.payload.map(card => ({
        ...card,
        balance: FIXED_BALANCE
      }));
      return {
        ...state,
        list: {
          ...state.list,
          data: cardsWithFixedBalance,
          loading: false
        }
      };
    
    case 'UPDATE_CARD_BALANCE':
      return {
        ...state,
        list: {
          ...state.list,
          data: state.list.data.map(card => 
            card.cardNumber === action.payload.cardNumber
              ? { ...card, balance: FIXED_BALANCE }
              : card
          )
        },
        activeBalance: state.active === action.payload.cardNumber ? FIXED_BALANCE : state.activeBalance
      };
    
    case 'GET_DESTINATIONS_SUCCESS':
      return {
        ...state,
        destinations: action.payload
      };
    
    default:
      return state;
  }
};

export default cardReducer;