import { getFixedBalance, FIXED_BALANCE_AMOUNT } from '../utils/balanceUtils';

class DataManager {
  constructor() {
    this.accounts = [];
    this.cards = [];
    this.activeAccount = null;
    this.activeCard = null;
  }

  // Account methods
  getAccountList() {
    return this.accounts.map(account => ({
      ...account,
      balance: getFixedBalance()
    }));
  }

  getAccount(accountNumber) {
    const account = this.accounts.find(acc => acc.accountNumber === accountNumber);
    return account ? {
      ...account,
      balance: getFixedBalance()
    } : null;
  }

  getActiveAccount() {
    if (!this.activeAccount) return null;
    return {
      ...this.activeAccount,
      balance: getFixedBalance()
    };
  }

  setActiveAccount(accountNumber, balance = null) {
    const account = this.accounts.find(acc => acc.accountNumber === accountNumber);
    if (account) {
      this.activeAccount = {
        ...account,
        balance: getFixedBalance()
      };
    }
  }

  updateAccountBalance(accountNumber, balance) {
    // Always use fixed balance
    const fixedBalance = getFixedBalance();
    
    this.accounts = this.accounts.map(account => 
      account.accountNumber === accountNumber 
        ? { ...account, balance: fixedBalance }
        : account
    );
    
    if (this.activeAccount && this.activeAccount.accountNumber === accountNumber) {
      this.activeAccount.balance = fixedBalance;
    }
  }

  // Card methods
  getCardList() {
    return this.cards.map(card => ({
      ...card,
      balance: getFixedBalance()
    }));
  }

  getCard(cardNumber) {
    const card = this.cards.find(c => c.cardNumber === cardNumber);
    return card ? {
      ...card,
      balance: getFixedBalance()
    } : null;
  }

  getActiveCard() {
    if (!this.activeCard) return null;
    return {
      ...this.activeCard,
      balance: getFixedBalance()
    };
  }

  setActiveCard(cardNumber, balance = null) {
    const card = this.cards.find(c => c.cardNumber === cardNumber);
    if (card) {
      this.activeCard = {
        ...card,
        balance: getFixedBalance()
      };
    }
  }

  updateCardBalance(cardNumber, balance) {
    // Always use fixed balance
    const fixedBalance = getFixedBalance();
    
    this.cards = this.cards.map(card => 
      card.cardNumber === cardNumber 
        ? { ...card, balance: fixedBalance }
        : card
    );
    
    if (this.activeCard && this.activeCard.cardNumber === cardNumber) {
      this.activeCard.balance = fixedBalance;
    }
  }

  // Initialize data
  setAccounts(accounts) {
    this.accounts = accounts.map(account => ({
      ...account,
      balance: getFixedBalance()
    }));
  }

  setCards(cards) {
    this.cards = cards.map(card => ({
      ...card,
      balance: getFixedBalance()
    }));
  }

  // Customer info
  getCustomerInfo() {
    return JSON.parse(localStorage.getItem('customerInfo') || '{}');
  }

  setCustomerInfo(info) {
    localStorage.setItem('customerInfo', JSON.stringify(info));
  }
}

export default new DataManager();