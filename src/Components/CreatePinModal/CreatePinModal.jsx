// import React, { useState } from 'react';
// import { createPin } from '../../Apicalls';
// import { config } from '../../Services';
// import './CreatePinModal.css';

// const CreatePinModal = ({ isOpen, onClose }) => {
//   const [wallet_pin, setPin] = useState('');
//   const [message, setMessage] = useState('');
//   const [pinCreated, setPinCreated] = useState(false);

//   const handleCreatePin = async () => {
//     if (!wallet_pin) {
//       setMessage('Please enter a PIN.');
//       return;
//     }

//     const response = await createPin(localStorage.getItem('userid'), wallet_pin);
//     if (response.error) {
//       setMessage(response.message);
//     } else {
//       setMessage('PIN created successfully!');
//       setPinCreated(true);
//       setPin('');
//       setTimeout(() => {
//         onClose();
//         window.location.replace(config.routeconfig.dashboard);
//       }, 5000);
//     }
//   };

//   return (
//     isOpen && (
//       <div className="create-pin-modal-overlay">
//         <div className="create-pin-modal">
//           {!pinCreated ? (
//             <>
//               <h2>Create Wallet PIN</h2>
//               <input
//                 type="password"
//                 value={wallet_pin}
//                 onChange={(e) => setPin(e.target.value)}
//                 placeholder="Enter your PIN"
//               />
//               <button className="create-button" onClick={handleCreatePin}>Create PIN</button>
//             </>
//           ) : (
//             <p className="success-message">{message}</p>
//           )}
//           {message && !pinCreated && <p className="error-message">{message}</p>}
//         </div>
//       </div>
//     )
//   );
// };

// export default CreatePinModal; // Ensure this line is present

import React, { useState } from 'react';
import { createPin } from '../../Apicalls';
import { config } from '../../Services';
import './CreatePinModal.css'; // Import the CSS file for styling

const CreatePinModal = ({ isOpen, onClose }) => {
  const [wallet_pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const [pinCreated, setPinCreated] = useState(false);

  const handleCreatePin = async () => {
    if (!wallet_pin) {
      setMessage('Please enter a PIN.');
      return;
    }

    const response = await createPin(localStorage.getItem('userid'), wallet_pin);
    if (response.error) {
      setMessage(response.message);
    } else {
      setMessage('PIN created successfully!');
      setPinCreated(true);
      setPin(''); // Clear the PIN input
      setTimeout(() => {
        onClose();
        window.location.replace(config.routeconfig.dashboard); // Redirect to dashboard after 10 seconds
      }, 10000);
    }
  };

  return (
    isOpen && (
      <div className="create-pin-modal-overlay">
        <div className="create-pin-modal">
          {!pinCreated ? (
            <>
              <h2>Create Wallet PIN</h2>
              <input
                type="password"
                value={wallet_pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter your PIN"
              />
              <button className="create-button" onClick={handleCreatePin}>Create PIN</button>
            </>
          ) : (
            <p className="success-message">{message}</p>
          )}
          {message && !pinCreated && <p className="error-message">{message}</p>}
        </div>
      </div>
    )
  );
};

export default CreatePinModal;