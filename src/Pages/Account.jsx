import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import { FaEye, FaEyeSlash, FaUserFriends, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { toggleVisibility, fetchProfileData, handleSaveChanges, handlePasswordUpdate } from '../Components/Account/AccountFunctions';
import defaultUserImg from '../Assets/userImg.jpg'; // Default image if none is available

function Account() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const [profileImage, setProfileImage] = useState(defaultUserImg);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData(setFullName, setEmail, setUsername, setProfileImage, defaultUserImg);
  }, []);

  const handleLogout = () => {
    // Save session data to local storage if needed
    const sessionData = {
      logoutTimestamp: new Date().toISOString(), // Example: save logout timestamp
      // You can add other session-related data here if needed
    };
    localStorage.setItem('sessionData', JSON.stringify(sessionData));
    
    // Clear session storage
    localStorage.clear();
    
    // Redirect to the login page
    navigate('/login', { state: { action: 'login' } });
  };

  return (
    <div className="account">
      <Layout>
        <div className="acct">
          <div className="account-container">
            <div className="profile-header">
              <img src={profileImage} alt="Profile" className="profile-image" />
            </div>

            <div className="edit-profile-box">
              <h5 onClick={() => setIsProfileOpen(!isProfileOpen)}>
                Edit Profile {isProfileOpen ? '▲' : '▼'}
              </h5>
              {isProfileOpen && (
                <form className="edit-profile-form" onSubmit={(e) => handleSaveChanges(e, fullName, email, username)}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text"
                      placeholder="Full Name" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Username</label>
                    <input 
                      type="text" 
                      placeholder="Username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                    />
                  </div>
                  <button type="submit">Save Changes</button>
                </form>
              )}
            </div>

            <div className="update-password-box">
              <h5 onClick={() => setIsPasswordOpen(!isPasswordOpen)}>
                Update Password {isPasswordOpen ? '▲' : '▼'}
              </h5>
              {isPasswordOpen && (
                <form onSubmit={(e) => handlePasswordUpdate(e, oldPassword, newPassword, confirmPassword)}>
                  <div className="password-field">
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      placeholder="Old Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <span
                      className="toggle-icon"
                      onClick={() => toggleVisibility(showOldPassword, setShowOldPassword)}
                    >
                      {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <div className="password-field">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span
                      className="toggle-icon"
                      onClick={() => toggleVisibility(showNewPassword, setShowNewPassword)}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <div className="password-field">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span
                      className="toggle-icon"
                      onClick={() => toggleVisibility(showConfirmPassword, setShowConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <button type="submit">Update</button>
                </form>
              )}
            </div>

            <div className="general-settings">
              <h5>General</h5>
              <ul>
                <li><FaUserFriends /> <span className="icon-text">Invite Friends</span></li> 
                <li><FaQuestionCircle /> <span className="icon-text">FAQ</span></li> 
                <li><FaQuestionCircle /> <span className="icon-text">Support</span></li>
              </ul>
              <button onClick={handleLogout} className="logout-button">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Account;
