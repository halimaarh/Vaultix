import React, { useState } from 'react';
import './Wcv.css';

function Wcv() {
  const [flipped, setFlipped] = useState(Array(4).fill(false));

  const data = [
    { title: "Seamless Integration with Paystack", text: "Vaultix integrates seamlessly with Paystack, ensuring fast, secure, and reliable transactions." },
    { title: "User-Friendly Interface", text: "Vaultix is designed to be intuitive and easy to use, catering to both beginners and tech-savvy users." },
    { title: "Instant Transfers", text: "Enjoy instant money transfers between Vaultix users with zero delays." },
    { title: "Enhanced Security", text: "Your security is our top priority with advanced encryption and security protocols." }
  ];

  const toggleFlip = (index) => {
    setFlipped(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className='wcv'>
      <div className="heading">
        <h1>WHY CHOOSE VAULTIX?</h1>
      </div>
      <div className="context">
        {data.map((item, index) => (
          <div 
            key={index} 
            className={`one ${flipped[index] ? 'flipped' : ''}`} 
            onClick={() => toggleFlip(index)}
          >
            <h1>{item.title}</h1>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wcv;
