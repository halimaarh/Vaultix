import React, { useState, useEffect } from 'react';
import A from '../../Assets/A.jpg';
import B from '../../Assets/B.jpg';
import C from '../../Assets/C.jpg';
import "./Home.css";

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  const handleReadMoreClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const backgrounds = [
    `url(${A})`,
    `url(${B})`,
    `url(${C})`,
  ];

  const textColors = ['#000', '#10ced6','#fff'];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='home' style={{ backgroundImage: backgrounds[bgIndex] }}>
      <div className="homeContainer">
        <div className="hometext">
          <h1 className="title" style={{ color: textColors[bgIndex] }}>
            Secure Your Funds with Vaultix
          </h1>
          <p className="subTitle" style={{ color: textColors[bgIndex] }}>
            Your Money, Your Vault, Your Way
          </p>
          <button className="homeBtn" onClick={handleReadMoreClick} style={{ borderColor: textColors[bgIndex] }}>
            <a href="#">Read More</a>
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popupContent">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <p>Vaultix is a secure and user-friendly platform designed to handle your financial transactions with ease. Whether you need to send, receive, or deposit money, Vaultix offers a seamless experience, ensuring that your funds are managed efficiently and safely. With Vaultix, your money is always in good hands.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
