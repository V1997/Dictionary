import React, { Component, useState } from 'react'
import Popup from '../popup/Popup';

const WordContainer = () => {

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const text = ['Brave', 'Adjective: description whatever it may take to be done.', 'Example: This is just an empty object must rely on this.'];
    return (
        <div className="word-container" onClick={togglePopup}>
            <h3>{text[0]}</h3>
            <p>{text[1]}</p>
            <p>{text[2]}</p>
            { isOpen && <Popup content = 
                {
                    <> 
                        <b>{text[0]}</b>
                        <p>{text[1]}</p> 
                        <p>{text[2]}</p>
                    </> 
                }
             handleClose={togglePopup} />
            }
        </div>
    )    
}


export default WordContainer
