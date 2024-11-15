import React from 'react'
import "./Button.css"
function Button(props) {
    const {buttonlabel,changeAction} = props;
  return (
    <div className='buttoncontainer'>
        <button onClick={changeAction} className='buttonlabel'>{buttonlabel}</button>
    </div>
  )
}

export default Button