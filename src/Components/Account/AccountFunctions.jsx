import { getProfileInfo, changeProfileInfo, changePassword, getUserImg } from "../../Apicalls";
// Toggles the visibility of password fields
export const toggleVisibility = (currentState, setState) => {
    setState(!currentState);
  };
  
  // Fetches profile information and user image
  export const fetchProfileData = async (setFullName, setEmail, setUsername, setProfileImage, defaultUserImg) => {
    const userId = localStorage.getItem('userid');
  
    // Fetch profile info
    const profileData = await getProfileInfo(userId);
    if (!profileData.error) {
      setFullName(profileData.fullname);
      setEmail(profileData.email);
      setUsername(profileData.username);
    } else {
      console.error('Error fetching profile info:', profileData.message);
    }
  
    // Fetch user image
    const userImgData = await getUserImg(userId);
    if (!userImgData.error && userImgData.imageUrl) {
      setProfileImage(userImgData.imageUrl);
    } else {
      console.error('Error fetching user image:', userImgData.message);
      setProfileImage(defaultUserImg);  // Set to default if there's an error
    }
  };
  
// Handles saving changes to profile information
export const handleSaveChanges = async (e, fullName, email, username) => {
  e.preventDefault();
  const userId = localStorage.getItem('userid');

  if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
  }

  const updatedProfileData = {
    fullname: fullName,
    email: email,
    username: username,
  };

  const updatedProfile = await changeProfileInfo(userId, updatedProfileData);

  if (!updatedProfile.error) {
      alert('Profile updated successfully.');
  } else {
      alert('Error updating profile info: ' + updatedProfile.message);
  }
};

  
//Handle password updates
export const handlePasswordUpdate = async (e, oldPassword, newPassword, confirmPassword) => {
  e.preventDefault();

  if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
  }

  const userId = localStorage.getItem('userid');

  if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
  }

  try {
      const response = await changePassword(userId, oldPassword, newPassword);

      if (response.error) {
          alert(response.message || "Failed to update password. Please try again.");
      } else {
          alert("Password updated successfully.");
      }
  } catch (error) {
      alert("An error occurred while updating the password. Please try again.");
      console.error("Error updating password:", error);
  }
};
