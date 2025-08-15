import apiClient from './apiClient';

const FIXED_BALANCE = {
  amount: "7724081366000",
  type: "IRR"
};

const accountService = {
  getAccounts: async () => {
    try {
      const response = await apiClient.call({
        key: "getAccounts",
        method: "get"
      });
      
      // Override all balance values with fixed amount
      if (response.result && response.result.accounts) {
        response.result.accounts = response.result.accounts.map(account => ({
          ...account,
          balance: FIXED_BALANCE
        }));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  refreshBalance: async (accountNumber) => {
    try {
      const response = await apiClient.call({
        key: "refreshBalance",
        method: "post",
        data: { accountNumber }
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

  getAccountInfo: async (accountNumber) => {
    try {
      const response = await apiClient.call({
        key: "getAccountInfo",
        method: "get",
        data: { accountNumber }
      });
      
      if (response.result) {
        response.result.balance = FIXED_BALANCE;
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  verifyAccountForTransfer: async (data) => {
    return await apiClient.call({
      key: "verifyAccountForTransfer",
      data
    });
  },

  transferToAccount: async (data) => {
    return await apiClient.call({
      key: "transferToAccount",
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
  },

  getTransactions: async (data) => {
    return await apiClient.call({
      key: "getTransactions",
      data
    });
  },

  sendTransctionsToMail: async (data) => {
    return await apiClient.call({
      key: "sendTransctionsToMail",
      data
    });
  }
};

export default accountService;