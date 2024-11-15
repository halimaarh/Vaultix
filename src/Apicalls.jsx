import axios from 'axios';
import { config } from "./Services";
// Destructure the base URL from the config object
var { baseurl } = config;

// Function to fetch user data from an external API
export var user = async () => {
  try {
    var response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data;
  } catch (error) {
    return { error: true, message: error.response.data.message };
  }
};

// Function to handle user sign-in
export var signin = async (username, password) => {
  try {
    var response = await axios.post(`${baseurl}/login/`, {
      username_or_email: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    return { error: true, message: error.response.data.message };
  }
};

// Function to handle user sign-up
export var signups = async (emailinput) => {
  console.log("emailinput", emailinput);
  try {
    var response = await axios.post(`${baseurl}/signup/`, {
      email: emailinput,
      user_type: "user",
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return { error: true, message: error.response.data.message };
  }
};

// Function to Complete Signup
export var completeSignup = async (emailinput, token, fullname, username, password) => {
  try {
    var response = await axios.post(`${baseurl}/verify-token/`, {
      email: emailinput,  
      token: token,
      full_name: fullname,
      username: username,
      password: password
    });
    return response.data;
  } catch (error) {
    console.log("Error during completeSignup:", error.response ? error.response.data : error.message);
    // Check if `message` is an object
    const errorMessage = error.response && typeof error.response.data.message === 'object' 
      ? JSON.stringify(error.response.data.message)
      : error.response ? error.response.data.message : "An unexpected error occurred.";
    return { error: true, message: errorMessage };
  }
}

// API call to top up the wallet
export const topUpWallet = async (user_id, amount) => {
  try {
    const response = await axios.post(`${baseurl}/topup-wallet/`, {
      user_id,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error('Error topping up wallet:', error);
    throw error;
  }
};

// Function to handle sending money
export const handleSendMoney = async (sender_id, receiver_username, amount, wallet_pin) => {
  try {
    const response = await axios.post(`${baseurl}/send-money/`, {
      sender_id,
      receiver_username,
      amount,
      wallet_pin
    });
    return response.data;
  } catch (error) {
    console.error('Error sending money:', error);
    throw error;
  }
};

//get username
export var username = async (user_id) => {
  try {
    var response = await axios.post(`${baseurl}/get-username/`, {
      user_id: user_id,
    })
    return response.data;
  } catch (error) {
    return {error:true, message:error.response.data.message}
    
  }
};

//get wallet balance
export var walletbalance = async (user_id) => {
  try {
    var response = await axios.post(`${baseurl}/get-wallet-balance/`, {
      user_id: user_id,
    })
    return response.data;
  } catch (error) {
    return {error:true, message:error.response.data.message}
    
  }
};

// Function to get all transactions
export var getAllTransactions = async (user_id) => {
  try {
    var response = await axios.post(`${baseurl}/get-all-transactions/`, {
      user_id: user_id,
    });
    return response.data;
  } catch (error) {
    return { error: true, message: error.response.data.message };
  }
};

//Function to get ProfileInfo
export var getProfileInfo = async (user_id) => {
  try {
    var response = await axios.post(`${baseurl}/get-username-email-fullname/`, {
      user_id: user_id,
    });
    return response.data;
  } catch (error) {
    return { error: true, message: error.response.data.message };
  }
};

//Function to change ProfileInfo
export var changeProfileInfo = async (user_id, updatedProfileData) => {
  try {
    var response = await axios.post(`${baseurl}/change-username-email-fullname/`, {
      user_id: user_id,
      fullname: updatedProfileData.fullname,
      email: updatedProfileData.email,
      username: updatedProfileData.username,
    });
    return response.data;
  } catch (error) {
    return { error: true, message: error.response?.data?.message || 'An error occurred' };
  }
};

// Function to change Password
export var changePassword = async (user_id, old_password, new_password) => {
  try {
    var response = await axios.post(`${baseurl}/change-password-logged-in/`, {
      user_id: user_id,
      old_password: old_password,
      new_password: new_password,
    });
    return response.data;
  } catch (error) {
    return { error: true, message: error.response.data.message };
  }
};

//Function to get user image
export var getUserImg = async (user_id) => {
  try {
    var response = await axios.post(`${baseurl}/get-user-profile-pic/`, {
      user_id: user_id,
    });
    return response.data;
  } catch (error) {
    return { error: true, message: error.response.data.message };
  }
};

//Function to create pin
export const createPin = async (user_id, wallet_pin) => {
  try {
    const response = await axios.post(`${baseurl}/create-wallet-pin/`, {
      user_id,
      wallet_pin,
    });
    return response.data; // Return the API response
  } catch (error) {
    // Return a standardized error message
    return {
      error: true,
      message: error.response ? error.response.data.message : 'An unexpected error occurred',
    };
  }
};

//Function to check pin availability
export const checkPinAvailability = async (user_id) => {
  try {
    const response = await axios.post(`${baseurl}/check-pin-availability/`, {
      user_id: user_id,
    });
    // Check the response message to determine if PIN is set
    return response.data.message === "Pin not set" ? { hasPin: false } : { hasPin: true };
  } catch (error) {
    return {
      error: true,
      message: error.response ? error.response.data.message : 'An unexpected error occurred',
    };
  }
};