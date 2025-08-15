import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatBalance, FIXED_BALANCE_AMOUNT } from '../utils/balanceUtils';

const CardBalance = ({ card, showRefresh = true, onRefresh }) => {
  const { t } = useTranslation();
  
  // Always use fixed balance amount
  const displayAmount = formatBalance({ amount: FIXED_BALANCE_AMOUNT });
  const balanceType = card?.balance?.type || 'IRR';

  const handleRefresh = (e) => {
    e.stopPropagation();
    if (onRefresh) {
      onRefresh(card?.cardNumber);
    }
  };

  return (
    <div className="balance-container">
      <div className="balance-label">
        <span onClick={showRefresh ? handleRefresh : undefined}>
          {t('CARD_BALANCE')}
          {showRefresh && (
            <svg className="refresh-icon">
              <use xlinkHref="#refresh-icon" />
            </svg>
          )}
        </span>
      </div>
      <div className="balance-value">
        <strong>{displayAmount}</strong>
        <span className="currency">{t(balanceType)}</span>
      </div>
    </div>
  );
};

export default CardBalance;