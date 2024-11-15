import React, { useState, useEffect } from 'react';
import { FaArrowDown, FaArrowUp, FaWallet} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { walletbalance, getAllTransactions } from '../../Apicalls'; // Import getAllTransactions

function WalletHomePage({ setActivePage }) {
  const [data, setData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch wallet balance and recent transactions
  const usercall = async () => {
    try {
      // Fetch wallet balance
      const resBalance = await walletbalance(localStorage.getItem('userid'));
      setData(resBalance);

      // Fetch recent transactions
      const resTransactions = await getAllTransactions(localStorage.getItem('userid'));
      if (resTransactions.status === 'success' && Array.isArray(resTransactions.transactions)) {
        // Sort transactions by date in descending order and get the top 3
        const sortedTransactions = resTransactions.transactions.sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date));
        setRecentTransactions(sortedTransactions.slice(0, 3));
      } else {
        console.error('Expected an array but received:', resTransactions);
        setRecentTransactions([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    usercall();
  }, []);

  return (
    <div className="wallet-content">
      <div className="wallet-header">
        <h1>Hi, Welcome back</h1>
      </div>
      <div className="wallet-box">
        <div className="wallet-balance">
          <p>Wallet Balance</p>
          <h2>{data.message}</h2>
        </div>
        <div className="arrows">
          {/* Arrow for navigating to the deposit page */}
          <FaArrowDown className="arrow down" onClick={() => setActivePage('deposit')} />
          {/* Arrow for navigating to the send money page */}
          <FaArrowUp className="arrow up" onClick={() => setActivePage('sendMoney')} />
        </div>
      </div>
      <div className="transaction-history">
        <h4>
          Transaction History
          <span className="see-all" onClick={() => navigate('/history')}>See All</span> {/* Updated onClick */}
        </h4>
        <div className="recent-transactions">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction, index) => (
              <div key={index} className="recent-transaction-item">
                <FaWallet className="wallet-icon" />
                <p>{transaction.transaction_type}</p>
                <p>Status: {transaction.status}</p>
                <p>Amount: {transaction.amount}</p>
                <p>Date: {new Date(transaction.transaction_date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No recent transactions available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WalletHomePage;
