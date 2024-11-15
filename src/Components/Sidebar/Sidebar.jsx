import React, { useState, useRef, useEffect } from 'react';
import './Sidebar.css';
import { CiUser } from 'react-icons/ci';
import { FaQuestion, FaWallet } from 'react-icons/fa';
import { MdHistory } from 'react-icons/md';
import { AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai';
import defaultUserImg from '../../Assets/userImg.jpg'; // Default image if none is available
import { username } from '../../Apicalls';
import {
  isActive,
  toggleSidebar,
  navigateToHome,
  config,
  handleResize
} from '../../Services';

const { dashboard, wallet, history, account, support } = config.routeconfig;

function Sidebar() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const sidebarRef = useRef(null);
  const [data, setData] = useState([]);
  const [profileImage, setProfileImage] = useState(defaultUserImg);

  // Calling the username API
  const usercall = async () => {
    try {
      var res = await username(localStorage.getItem('userid'));
      setData(res);
      console.log("data", data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    usercall();
  }, []);

  useEffect(() => {
    handleResize(setSidebarActive);
    window.addEventListener('resize', () => handleResize(setSidebarActive));

    return () => {
      window.removeEventListener('resize', () => handleResize(setSidebarActive));
    };
  }, []);

  return (
    <>
      <AiOutlineMenu
        className={`sidebar-toggle ${sidebarActive ? '' : 'active'}`}
        onClick={() => toggleSidebar(sidebarRef, setSidebarActive)}
      />

      <div className={`sidebar ${sidebarActive ? 'active' : ''}`} ref={sidebarRef}>
        <div className="sidebarheader">
          <img className="logo" src={profileImage} alt="User" />
          <div className="user-welcome">
            <p>Welcome</p>
            <h2>{data.message}</h2>
          </div>
        </div>

        <div className="sidebarmain">
          <a href={dashboard} style={{ backgroundColor: isActive(dashboard) ? '#10ced6' : '' }}>
            <div className='iconmain'>
              <h1>Overview</h1>
            </div>
          </a>

          <a href={wallet} style={{ backgroundColor: isActive(wallet) ? '#10ced6' : '' }}>
            <div className='iconmain'>
              <FaWallet className='sidebar-icon' />
              <h1>Wallet</h1>
            </div>
          </a>

          <a href={history} style={{ backgroundColor: isActive(history) ? '#10ced6' : '' }}>
            <div className='iconmain'>
              <MdHistory className='sidebar-icon' />
              <h1>History</h1>
            </div>
          </a>

          <a href={account} style={{ backgroundColor: isActive(account) ? '#10ced6' : '' }}>
            <div className='iconmain'>
              <CiUser className='sidebar-icon' />
              <h1>Account</h1>
            </div>
          </a>

          <a href={support} style={{ backgroundColor: isActive(support) ? '#10ced6' : '' }}>
            <div className='iconmain'>
              <FaQuestion className='sidebar-icon' />
              <h1>Support</h1>
            </div>
          </a>

          <a onClick={navigateToHome} id="quit">
            <div className='iconmain'>
              <AiOutlineLogout className='sidebar-icon' />
              <h1>Quit</h1>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
