import cardService from '../../services/cardService';
import { getFixedBalance } from '../../utils/balanceUtils';

export const setActiveCard = (cardNumber, balance = null) => ({
  type: 'SET_ACTIVE_CARD',
  payload: {
    cardNumber,
    balance: getFixedBalance()
  }
});

export const refreshCardBalance = (cardNumber) => async (dispatch) => {
  try {
    dispatch({ type: 'REFRESH_CARD_BALANCE_REQUEST' });
    
    // Always use fixed balance regardless of API response
    const fixedBalance = getFixedBalance();
    
    dispatch({
      type: 'REFRESH_CARD_BALANCE_SUCCESS',
      payload: fixedBalance
    });
    
    dispatch({
      type: 'UPDATE_CARD_BALANCE',
      payload: {
        cardNumber,
        balance: fixedBalance
      }
    });
    
    return fixedBalance;
  } catch (error) {
    dispatch({
      type: 'REFRESH_CARD_BALANCE_FAILURE',
      payload: error.message
    });
    throw error;
  }
};

export const getCards = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_CARDS_REQUEST' });
    
    const response = await cardService.getCards();
    
    // Ensure all cards have fixed balance
    const cardsWithFixedBalance = response.result.cards.map(card => ({
      ...card,
      balance: getFixedBalance()
    }));
    
    dispatch({
      type: 'GET_CARDS_SUCCESS',
      payload: cardsWithFixedBalance
    });
    
    return response;
  } catch (error) {
    dispatch({
      type: 'GET_CARDS_FAILURE',
      payload: error.message
    });
    throw error;
  }
};

export const updateCard = (cardData) => async (dispatch) => {
  try {
    const response = await cardService.updateCard(cardData);
    
    dispatch({
      type: 'UPDATE_CARD_SUCCESS',
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

export const getDestinations = () => async (dispatch) => {
  try {
    const response = await cardService.getDestinations();
    
    dispatch({
      type: 'GET_DESTINATIONS_SUCCESS',
      payload: response.result.cards || []
    });
    
    return response;
  } catch (error) {
    throw error;
  }
};