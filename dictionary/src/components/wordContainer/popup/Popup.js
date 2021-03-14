import React from "react";

const Popup = props => {
  
  const {handleClose} = props;
  return (
    <div className="popup-box">
      <div className="box">
        {/* <span className="close-icon" onClick={props.handleClose}>x</span> */}
        <span className="close-icon" onClick={handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;