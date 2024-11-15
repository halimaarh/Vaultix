import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import InputContent from "../Components/InputContent/InputContent";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiShow, BiHide } from "react-icons/bi";
import Button from "../Components/Button/Button.jsx";
import ReactModal from "react-modal";
import { signin, signups, completeSignup } from "../Apicalls";
import "./LoginSignup.css";
import { config } from "../Services";

export default function LoginSignup() {
  const location = useLocation();
  const [action, setAction] = useState("signup");

  useEffect(() => {
    if (location.state && location.state.action) {
      setAction(location.state.action);
    }
  }, [location.state]);

  const [value, setValue] = useState({
    email: "",
    password: "",
    token: "",
    full_name: "",
    username: "",
    error: "",
    showPassword: false,
  });

  const [controlModal, setControlModal] = useState(false);
  const { email, password, token, full_name, username, error, showPassword } = value;

  const customStyles = {
    content: {
      top: "10%",
      left: "30%",
      right: "30%",
      bottom: "auto",
      boxShadow: "0 0 10px 0 rgba(0, 0, 97, 0.5)",
      overflow: "auto",
      borderRadius: "8px",
      padding: "20px",
      outline: "none",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const handleChange = (name, value) => {
    setValue((previous) => ({ ...previous, [name]: value, error: "" }));
  };

  const togglePasswordVisibility = () => {
    setValue((previous) => ({
      ...previous,
      showPassword: !previous.showPassword,
    }));
  };

  const changeAction = async (actionName) => {
    try {
      if (actionName === "login") {
        const loginResponse = await signin(email, password);
        if (loginResponse.error) {
          setValue((previous) => ({ ...previous, error: loginResponse.message }));
        } else {
          localStorage.setItem("userid", loginResponse.user_id);
          window.location.replace(config.routeconfig.dashboard);
        }
      } else if (actionName === "signup") {
        const signupResponse = await signups(email);
        if (signupResponse.error) {
          setValue((previous) => ({ ...previous, error: signupResponse.message }));
        } else {
          setControlModal(true);
        }
      } else if (actionName === "completeSignup") {
        const completeSignupResponse = await completeSignup(email, token, full_name, username, password);
        if (completeSignupResponse.error) {
          // If there's an error, update the error state
          setValue((previous) => ({
            ...previous,
            error: completeSignupResponse.message || "An error occurred during signup completion.",
          }));
        } else {
          setControlModal(false);
          setAction("login"); // Switch to login state
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setValue({
        email: "",
        password: "",
        token: "",
        full_name: "",
        username: "",
        error: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const renderSignup = () => (
    <>
      <InputContent
        changetext={(event) => handleChange("email", event.target.value)}
        value={email}
        type="email"
        placeholder="Enter Email Address"
        icon={<MdEmail className="icon" />}
      />
    </>
  );

  const renderLogin = () => (
    <>
      <InputContent
        changetext={(event) => handleChange("email", event.target.value)}
        value={email}
        type="text"
        placeholder="Enter your Email"
        icon={<CiUser className="icon" />}
      />
      <InputContent
        changetext={(event) => handleChange("password", event.target.value)}
        value={password}
        type={showPassword ? "text" : "password"}
        placeholder="Enter your Password"
        icon={<RiLockPasswordFill className="icon" />}
        toggleIcon={showPassword ? <BiHide /> : <BiShow />}
        togglePasswordVisibility={togglePasswordVisibility}
      />
    </>
  );

  return (
    <div className="logincontainer">
      <div className="overlay">
        <div className="content">
          <div className="signup">
            <h1>{action === "signup" ? "Signup" : "Login"}</h1>
            <div className="line"></div>
          </div>

          {action === "signup" ? renderSignup() : renderLogin()}
          <div className="buttoncontainer">
            <Button
              changeAction={() => changeAction(action)}
              buttonlabel={action === "signup" ? "Signup" : "Login"}
            />
          </div>
          <div style={{ color: "#ff0000" }} className="error">
            {typeof error === "string" ? error : "An unexpected error occurred."}
          </div>
        </div>
        <ReactModal 
          isOpen={controlModal}
          style={customStyles}
        >
          <h2 style={{ textAlign: "center", color: "#10ced6" }}>Complete Signup</h2>
          <InputContent
            changetext={(event) => handleChange("email", event.target.value)}
            value={email}
            type="text"
            placeholder="Enter your Email"
            icon={<MdEmail className="icon" />}
          />
          <InputContent
            changetext={(event) => handleChange("token", event.target.value)}
            value={token}
            type="text"
            placeholder="Enter your Token here"
            icon={<RiLockPasswordFill className="icon" />}
          />
          <InputContent
            changetext={(event) => handleChange("full_name", event.target.value)}
            value={full_name}
            type="text"
            placeholder="Enter your Fullname here"
            icon={<CiUser className="icon" />}
          />
          <InputContent
            changetext={(event) => handleChange("username", event.target.value)}
            value={username}
            type="text"
            placeholder="Enter your Username here"
            icon={<CiUser className="icon" />}
          />
          <InputContent
            changetext={(event) => handleChange("password", event.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password here"
            icon={<RiLockPasswordFill className="icon" />}
            toggleIcon={showPassword ? <BiHide /> : <BiShow />}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          <div className="buttoncontainer">
            <Button
              changeAction={() => changeAction("completeSignup")}
              buttonlabel="Signup"
            />
            <Button
              changeAction={() => setControlModal(false)}
              buttonlabel="Cancel"
            />
          </div>
          <div style={{ color: "#ff0000" }} className="error">
            {typeof error === "string" ? error : "An unexpected error occurred."}
          </div>
        </ReactModal>
      </div>
    </div>
  );
}
