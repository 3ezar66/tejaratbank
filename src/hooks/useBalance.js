import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshBalance } from '../store/actions/accountActions';
import { refreshCardBalance } from '../store/actions/cardActions';
import { FIXED_BALANCE_AMOUNT, formatBalance } from '../utils/balanceUtils';

export const useAccountBalance = (accountNumber) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  // Always return fixed balance
  const balance = {
    amount: FIXED_BALANCE_AMOUNT,
    type: 'IRR'
  };
  
  const formattedBalance = formatBalance(balance);

  const refresh = async () => {
    setLoading(true);
    try {
      await dispatch(refreshBalance(accountNumber));
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    balance,
    formattedBalance,
    loading,
    refresh
  };
};

export const useCardBalance = (cardNumber) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  // Always return fixed balance
  const balance = {
    amount: FIXED_BALANCE_AMOUNT,
    type: 'IRR'
  };
  
  const formattedBalance = formatBalance(balance);

  const refresh = async () => {
    setLoading(true);
    try {
      await dispatch(refreshCardBalance(cardNumber));
    } catch (error) {
      console.error('Failed to refresh card balance:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    balance,
    formattedBalance,
    loading,
    refresh
  };
};