import React from 'react';
import "./TransferReceipt.css";

const TransferReceipt = ({ receiverUsername, amount, onClose }) => {
  return (
    <div className="transfer-receipt">
      <h2>Transfer Successful</h2>
      <p>Receiver: {receiverUsername}</p>
      <p>Amount Sent: {amount} Naira</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TransferReceipt;
