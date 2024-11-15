import React, { useState } from 'react';
import { GiWallet } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { Link } from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
  const [isNavBarActive, setIsNavBarActive] = useState(false);

  const toggleNavbar = () => {
    setIsNavBarActive(!isNavBarActive);
  };

  return (
    <div className="navbar">
        <div className="vaultix-logo">
            <a href="#" className='mainlogo'>
                <h1 className='flex'>
                  Vault<span>ix</span>
                </h1>
            </a>
        </div>

        <div className={`navBar ${isNavBarActive ? "active" : ""}`}>
            <div className='navLists flex'>
                <div className='navbarBtns flex'>
                    <button className='btn loginBtn'>
                        <Link to="/login" state={{ action: "login" }}>Login</Link>
                    </button>
                    <button className='btn signupBtn'>
                        <Link to="/signup" state={{ action: "signup" }}>Sign up</Link>
                    </button>
                </div>

                <div className="closeNavbar" onClick={toggleNavbar}>
                    <AiFillCloseCircle className='icon' />
                </div>
            </div>
        </div>

        <div className="toggleNavbar" onClick={toggleNavbar}>
            <TbGridDots className='icon' />
        </div>
    </div>
  );
}

export default Navbar;
