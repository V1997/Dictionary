import React from 'react';
import FloatBtnPopup from './FloatBtnPopup';

class FloatingButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          popup: false,
        };
        this.togglePopup = this.togglePopup.bind(this);
    }

    togglePopup() {
      this.setState({
        popup: !this.state.popup
      });
    }
  
    
    render() {
    return (
            <div className="App">
                <button className="floating-btn" onClick={this.togglePopup}>
                    +
                </button>
                { this.state.popup ?  
                  <FloatBtnPopup closePopup={ this.togglePopup }
                  />
                  : null
                }
            </div>
        );
    };
}

export default FloatingButton;