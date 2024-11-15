// Function to check if the current route is active
export function isActive(myroute) {
  return window.location.pathname == myroute? true: false;
}

//Function to check if a user is authenticated
export function isauthenticated() {
  var authenticated = localStorage.getItem("userid") ? true : false;
  return authenticated;
}


// Config for route paths
export const config = {
  baseurl:"https://radar2.pythonanywhere.com",
  loginstate:["signup", "login"],
  routeconfig: {
    dashboard: "/dashboard",
    wallet: "/wallet",
    history: "/history",
    account: "/account",
    support: "/support",
  }
};

/*HomeSupport*/
// Function to handle navigation back to the homepage
export const navigateToHome = () => {
  localStorage.clear();
  window.location.href = "/";

};
/*End of HomeSupport*/

// Function to toggle sidebar visibility
export const toggleSidebar = (sidebarRef, setSidebarActive) => {
  const isCurrentlyActive = sidebarRef.current.classList.contains('active');
  setSidebarActive(!isCurrentlyActive);
  sidebarRef.current.classList.toggle('active', !isCurrentlyActive);
};

// Function to hide the toggle button on wide screens
export const handleResize = (setSidebarActive) => {
  const windowWidth = window.innerWidth;
  if (windowWidth > 768) {
    setSidebarActive(true); // Show sidebar on wide screens
  } else {
    setSidebarActive(false); // Hide sidebar on smaller screens by default
  }
};

/*Wallet*/
// Function to set the active page to 'sendMoney'
export const handleArrowUpClick = (setActivePage) => {
  setActivePage('sendMoney');
};

// Function to set the active page to 'deposit'
export const handleArrowDownClick = (setActivePage) => {
  setActivePage('deposit');
};

// Function to set the active page to 'wallet'
export const handleBackClick = (setActivePage) => {
  setActivePage('wallet');
};
/*End of Wallet*/

