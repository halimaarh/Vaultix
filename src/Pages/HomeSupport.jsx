import React from 'react'
import { navigateToHome } from '../Services';

function HomeSupport() {
  return (
      <div className="home-support-container">
        <div className="home-support-form">
          <h2>Support</h2>
          <form>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" required />
            
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
            
            <button type="submit" className="home-support-btn">Submit</button>
          </form>
        </div>
        <div className="home-back-to-home">
          <button onClick={navigateToHome} className="home-back-arrow">
            &larr;
          </button>
        </div>
      </div>
  )
}

export default HomeSupport;
