import React from "react";
import "./InputContent.css";

export default function InputContent(props) {
  const { type, placeholder, icon, changetext, value, toggleIcon, togglePasswordVisibility } = props;
  
  return (
    <div className="inputcontent">
      <div className="iconcontainer">
        {icon}
      </div>
      <input 
        value={value} 
        onChange={changetext} 
        type={type} 
        placeholder={placeholder} 
        className="inputtext" 
      />
      {toggleIcon && (
        <div className="toggleIcon" onClick={togglePasswordVisibility}>
          {toggleIcon}
        </div>
      )}
    </div>
  );
}
