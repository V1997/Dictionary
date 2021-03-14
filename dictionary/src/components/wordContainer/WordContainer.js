import React, { setState } from 'react'
import Popup from './popup/Popup';

class WordContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            isOpen: false,
        }
        this.togglePopup = this.togglePopup.bind(this);

    }
    togglePopup() {
        if(this.state.isOpen) {
            document.body.removeEventListener('click', () => null);
        }
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
    const text = ['Brave', 'Adjective: description whatever it may take to be done.', 'Example: This is just an empty object must rely on this.'];
        return (
            <div className="word-container" onClick={this.togglePopup} >
                <h3>{text[0]}</h3>
                <p>{text[1]}</p>
                <p>{text[2]}</p>
                { this.state.isOpen && <Popup content = 
                    {
                        <> 
                            <b>{text[0]}</b>
                            <p>{text[1]}</p> 
                            <p>{text[2]}</p>
                        </> 
                    }
                handleClose={this.togglePopup} />
                }
            </div>
        )    
    }
}

export default WordContainer