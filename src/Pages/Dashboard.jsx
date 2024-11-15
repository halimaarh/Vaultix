import React, { useState, useEffect } from 'react';
import CreatePinModal from '../Components/CreatePinModal/CreatePinModal';
import { checkPinAvailability } from '../Apicalls'; // Adjust import based on your project structure
import Layout from '../Components/Layout/Layout';

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [user_id, setUserId] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { text: "Welcome To Vaultix", color: "#10ced6" },
    { text: "Your money", color: "#2c3e50" },
    { text: "Your vault", color: "#10ced6" },
    { text: "Your way", color: "#2c3e50" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  // Fetch the user ID from local storage when the component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('userid'); // Use 'userid' key
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Check PIN availability and open the modal if PIN is not set
  useEffect(() => {
    const checkPin = async () => {
      if (user_id) {
        const response = await checkPinAvailability(user_id);
        if (response.hasPin === false) {
          setModalOpen(true);
        }
      }
    };

    checkPin();
  }, [user_id]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="slide" style={{ backgroundColor: '#f4f4f4' }}>
          <h1
            key={currentSlide}
            className="slide-text"
            style={{ color: slides[currentSlide].color }}
          >
            {slides[currentSlide].text}
          </h1>
        </div>

        {user_id && (
          <CreatePinModal isOpen={isModalOpen} onClose={handleCloseModal} />
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;