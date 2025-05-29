import React, { useState } from 'react';
import FloatBtnPopup from './FloatBtnPopup';
import './FloatingButton.css';

const FloatingButton = ({ onSearch }) => {
    const [popup, setPopup] = useState(false);

    const togglePopup = () => {
        setPopup(!popup);
    };

    return (
        <div className="floating-button-container">
            <button className="floating-btn" onClick={togglePopup}>
                +
            </button>
            {popup && (
                <FloatBtnPopup 
                    closePopup={togglePopup}
                    onSearch={onSearch}
                />
            )}
        </div>
    );
};

export default FloatingButton;