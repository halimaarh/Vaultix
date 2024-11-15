import React from 'react';
import Navbar from "../Components/Navbar/Navbar";
import Home from "../Components/Home/Home";
import Hvw from '../Components/HowVaultixWorks/Hvw';
import Wcv from '../Components/WhyChooseVaultix/Wcv';
import Reviews from '../Components/Reviews/Reviews';
import Footer from '../Components/Footer/Footer';

function Homepage() {
  return (
    <div className='homepage'>
        <Navbar/>
        <Home/>
        <Hvw/>
        <Wcv/>
        <Reviews/>
        <Footer/>
    </div>
  );
}

export default Homepage;
