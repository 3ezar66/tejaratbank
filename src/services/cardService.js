import apiClient from './apiClient';

const FIXED_BALANCE = {
  amount: "7724081366000",
  type: "IRR"
};

const cardService = {
  getCards: async () => {
    try {
      const response = await apiClient.call({
        key: "getCards",
        method: "get"
      });
      
      // Override all balance values with fixed amount
      if (response.result && response.result.cards) {
        response.result.cards = response.result.cards.map(card => ({
          ...card,
          balance: FIXED_BALANCE
        }));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  refreshCardBalance: async (cardNumber) => {
    try {
      const response = await apiClient.call({
        key: "refreshCardBalance",
        method: "post",
        data: { cardNumber }
      });
      
      // Always return fixed balance regardless of API response
      return {
        ...response,
        result: {
          ...response.result,
          balance: FIXED_BALANCE
        }
      };
    } catch (error) {
      throw error;
    }
  },

  getCardInfo: async (cardNumber) => {
    try {
      const response = await apiClient.call({
        key: "getCardInfo",
        method: "get",
        data: { cardNumber }
      });
      
      if (response.result) {
        response.result.balance = FIXED_BALANCE;
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  getDestinations: async () => {
    return await apiClient.call({
      key: "getDestinations",
      method: "get"
    });
  },

  verifyCard: async (data) => {
    return await apiClient.call({
      key: "verifyCard",
      data
    });
  },

  transferToCard: async (data) => {
    return await apiClient.call({
      key: "transferToCard",
      data
    });
  },

  verifyMobileTransfer: async (data) => {
    return await apiClient.call({
      key: "verifyMobileTransfer",
      data
    });
  },

  transferToMobile: async (data) => {
    return await apiClient.call({
      key: "transferToMobile",
      data
    });
  }
};

export default cardService;