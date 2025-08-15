import { interceptApiResponse } from '../utils/balanceUtils';

class ApiClient {
  constructor() {
    this.baseURL = 'https://mbt.tejaratbank.ir/api/';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'agent': 'PWA',
      'appver': '1.3.7',
      'communicationchannel': 'REST',
      'devicetype': 'Simulator',
      'osver': 'PWA',
      'signature': 'PWA'
    };
  }

  async call({ key, method = 'POST', data = null }) {
    try {
      const url = `${this.baseURL}${this.getEndpoint(key)}`;
      const token = this.getAuthToken();
      
      const headers = {
        ...this.defaultHeaders,
        ...(token && { 'authorization': `Basic ${token}` })
      };

      const config = {
        method: method.toUpperCase(),
        headers,
        ...(data && { body: JSON.stringify(data) })
      };

      const response = await fetch(url, config);
      const result = await response.json();
      
      // Intercept and modify balance values in all API responses
      return interceptApiResponse(result);
      
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  getEndpoint(key) {
    const endpoints = {
      'getAccounts': 'account/list',
      'getCards': 'card/list',
      'refreshBalance': 'account/balance',
      'refreshCardBalance': 'card/balance',
      'getAccountInfo': 'account/info',
      'getCardInfo': 'card/info',
      'verifyAccountForTransfer': 'transfer/verify',
      'transferToAccount': 'transfer/account',
      'verifyCard': 'card/verify',
      'transferToCard': 'card/transfer',
      'verifyMobileTransfer': 'transfer/mobile/verify',
      'transferToMobile': 'transfer/mobile',
      'getDestinations': 'card/destination',
      'getTransactions': 'account/transactions',
      'sendTransctionsToMail': 'account/transactions/email'
    };
    
    return endpoints[key] || key;
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }

  clearAuthToken() {
    localStorage.removeItem('authToken');
  }
}

export default new ApiClient();