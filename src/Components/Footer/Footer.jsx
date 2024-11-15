import React from 'react';
import './Footer.css';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                  <div className="mainlogo">
                    <h1 className='flex'>
                      Vault<span>ix</span>
                    </h1>
                  </div>
                    <p>
                        Vaultix is your go-to solution for secure and fast transactions. Trusted by users
                        worldwide, we ensure your financial data is always protected.
                    </p>
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <p>Email: support@vaultix.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
                <div className="footer-section social">
                    <h2>Follow Us</h2>
                    <div className="social-icons">
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaLinkedinIn /></a>
                        <a href="#"><FaInstagram /></a>
                    </div>
                </div>
                <div className="footer-section support">
                    <h2>Support</h2>
                    <button className="support-button" onClick={() => window.location.href = '/homesupport'}>Get Support</button>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Vaultix. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
