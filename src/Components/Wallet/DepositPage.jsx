import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const DepositPage = ({ amount, setAmount, handleDeposit, setActivePage }) => {
  return (
    <div className="deposit-page">
      <FaArrowLeft className="back-arrow" onClick={() => setActivePage('wallet')} />
      <h2>Deposit</h2>
      <div className="deposit-box">
        <input 
          type="number" 
          placeholder="Enter amount in Naira" 
          className="amount-box" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)} 
        />
      </div>
      <button className="proceed-button" onClick={handleDeposit}>Proceed</button>
    </div>
  );
};

export default DepositPage;
