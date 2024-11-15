import React from 'react'
import Layout from '../Components/Layout/Layout';

function Support() {
  return (
    <div className="support">
    <Layout>
      <div className="support-container">
        <div className="support-form">
          <h2>Support</h2>
          <form>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" required />
            
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
            
            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
     </div>
    </Layout>
    </div>
  )
}

export default Support