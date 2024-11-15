import React, { useEffect, useState } from 'react';
import { FaFilter, FaWallet } from 'react-icons/fa';
import Layout from "../Components/Layout/Layout";
import { getAllTransactions } from '../Apicalls';
import Modal from 'react-modal';

// Bind modal to app element for accessibility
Modal.setAppElement('#root');

function History() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState('');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem('userid');
        if (userId) {
          const res = await getAllTransactions(userId);

          if (res.status === 'success' && Array.isArray(res.transactions)) {
            // Sort transactions by date in descending order
            const sortedTransactions = res.transactions.sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date));
            setTransactions(sortedTransactions);
            setFilteredTransactions(sortedTransactions);
          } else {
            console.error('Expected an array but received:', res);
            setTransactions([]);
            setFilteredTransactions([]);
          }
        } else {
          console.error('User ID not found in local storage.');
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        setTransactions([]);
        setFilteredTransactions([]);
      }
    };

    fetchTransactions();
  }, []);

  const handleFilter = (type) => {
    setFilter(type);
    setShowFilterOptions(false);

    if (type === 'all') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter(transaction => transaction.transaction_type === type));
    }
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setModalIsOpen(true); // Open the modal when a transaction is clicked
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTransaction(null); // Clear selected transaction on modal close
  };

  return (
    <div className="history">
      <Layout>
        <div className="history-header">
          <h1>Transaction History</h1>
          <FaFilter className="filter-icon" onClick={() => setShowFilterOptions(!showFilterOptions)} />
        </div>

        {showFilterOptions && (
          <div className="filter-options">
            <p>Filter by:</p>
            <button onClick={() => handleFilter('deposit')} className="filter-button deposit">Deposits</button>
            <button onClick={() => handleFilter('transfer')} className="filter-button sent">Transfers</button>
            <button onClick={() => handleFilter('all')} className="filter-button all">All</button>
          </div>
        )}

        <div className="transaction-list">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <div 
                key={index} 
                className="transaction-item" 
                onClick={() => handleTransactionClick(transaction)}
              >
                <FaWallet className="wallet-icon" />
                <p>{transaction.transaction_type}</p>
                <p>Status: {transaction.status}</p>
                <p>Date: {new Date(transaction.transaction_date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No transactions available.</p>
          )}
        </div>

        {/* React Modal Implementation */}
        {selectedTransaction && (
          <Modal 
            isOpen={modalIsOpen} 
            onRequestClose={closeModal} 
            contentLabel="Transaction Details"
            overlayClassName="modal-overlay"
            className="modal-content"
          >
            <button onClick={closeModal} className="close-modal-x-button">&times;</button>
            <div className="transaction-details-modal">
              <FaWallet className="modal-wallet-icon" />
              <h2>Transaction Details</h2>
              <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
              <p><strong>Type:</strong> {selectedTransaction.transaction_type}</p>
              <p><strong>Status:</strong> {selectedTransaction.status}</p>
              <p><strong>Date:</strong> {new Date(selectedTransaction.transaction_date).toLocaleString()}</p>
              <p><strong>Reference:</strong> {selectedTransaction.reference}</p>
              {selectedTransaction.receiver_name && (
                <p><strong>Receiver:</strong> {selectedTransaction.receiver_name}</p>
              )}
              {selectedTransaction.payment_method && (
                <p><strong>Payment Method:</strong> {selectedTransaction.payment_method}</p>
              )}
              {selectedTransaction.credited_to && (
                <p><strong>Credited To:</strong> {selectedTransaction.credited_to}</p>
              )}
              <button onClick={closeModal} className="close-modal-button">Close</button>
            </div>
          </Modal>
        )}
      </Layout>
    </div>
  );
}

export default History;
