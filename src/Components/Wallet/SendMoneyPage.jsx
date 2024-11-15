import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import TransferReceipt from './TransferReceipt'; // Import the TransferReceipt component

const SendMoneyPage = ({
  receiverUsername, 
  setReceiverUsername, 
  amount, 
  setAmount, 
  walletPin, 
  setWalletPin, 
  message, 
  handleProceedClick, 
  setActivePage 
}) => {
  const [showReceipt, setShowReceipt] = useState(false);

  const handleProceedAndShowReceipt = async () => {
    const isSuccess = await handleProceedClick();
    if (isSuccess) {
      setShowReceipt(true);
    }
  };

  return (
    <div className="send-money-page">
      <FaArrowLeft className="back-arrow" onClick={() => setActivePage('wallet')} />
      <h2>Send Money</h2>

      {!showReceipt ? (
        <>
          <input 
            type="text" 
            placeholder="Receiver Username" 
            className="search-box" 
            value={receiverUsername} 
            onChange={(e) => setReceiverUsername(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder="Amount" 
            className="amount-box" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Enter Wallet PIN" 
            className="pin-box styled-pin-box" 
            value={walletPin} 
            onChange={(e) => setWalletPin(e.target.value)} 
          />
          <button className="proceed-button" onClick={handleProceedAndShowReceipt}>Proceed</button>
          {message && !showReceipt && (
            <div className={message === 'Transaction Successful' ? 'popup-success' : 'popup-failed'}>
              {message}
            </div>
          )}
        </>
      ) : (
        <TransferReceipt 
          receiverUsername={receiverUsername} 
          amount={amount} 
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
};

export default SendMoneyPage;
