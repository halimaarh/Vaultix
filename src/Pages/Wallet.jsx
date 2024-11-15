import React, { useState } from 'react';
import Layout from "../Components/Layout/Layout";
import SendMoneyPage from '../Components/Wallet/SendMoneyPage';
import DepositPage from '../Components/Wallet/DepositPage';
import WalletHomePage from '../Components/Wallet/WalletHomePage';
import { handleSendMoney, topUpWallet } from '../Apicalls';
import { useNavigate } from 'react-router-dom';
import { config } from '../Services';

function Wallet() {
  const [activePage, setActivePage] = useState('wallet'); // Default page is 'wallet'
  const [userId, setUserId] = useState(localStorage.getItem('userid')); // Fetching user ID from local storage
  const [receiverUsername, setReceiverUsername] = useState(''); // Receiver username for sending money
  const [amount, setAmount] = useState(''); // Transaction amount
  const [walletPin, setWalletPin] = useState(''); // Wallet PIN for authentication
  const [message, setMessage] = useState(''); // State for success or failure message
  const navigate = useNavigate(); // Hook to handle navigation

  const handleDeposit = async () => {
    try {
      const response = await topUpWallet(userId, amount);
      window.location.href = response.authorization_url;
      
      // Wait for the payment process to complete and then redirect back to Wallet page
      // Assuming `response.redirectAfterPayment` is the flag to check
      if (response.redirectAfterPayment) {
        window.location.replace(config.routeconfig.wallet); // Redirect to wallet page after payment
      }
    } catch (error) {
      console.error('Error during deposit:', error);
    }
  };

  const handleProceedClick = async () => {
    try {
      const response = await handleSendMoney(userId, receiverUsername, amount, walletPin);
      setMessage('Transaction Successful');
      return true; // Indicating success
    } catch (error) {
      setMessage('Transaction Unsuccessful');
      return false; // Indicating failure
    }
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'sendMoney':
        return (
          <SendMoneyPage
            receiverUsername={receiverUsername}
            setReceiverUsername={setReceiverUsername}
            amount={amount}
            setAmount={setAmount}
            walletPin={walletPin}
            setWalletPin={setWalletPin}
            message={message}
            handleProceedClick={handleProceedClick}
            setActivePage={setActivePage}
          />
        );
      case 'deposit':
        return (
          <DepositPage
            amount={amount}
            setAmount={setAmount}
            handleDeposit={handleDeposit}
            setActivePage={setActivePage}
          />
        );
      case 'wallet':
      default:
        return <WalletHomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="wallet">
      <Layout>
        {renderActivePage()}
      </Layout>
    </div>
  );
}

export default Wallet;
