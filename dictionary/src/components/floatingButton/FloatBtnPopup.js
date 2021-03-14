import React from 'react';

class FloatBtnPopup extends React.Component {

    addToDB() {
        console.log('add button clicked');
    }
    render() {
        const { closePopup } = this.props;
        return (<div className='popup'>
            <div className='popup_inner'>
                    <div className='popup-header'>
                        <h2>Add New Word</h2>
                        <button onClick={closePopup}>X</button>
                    </div>
                    <hr />
                    <p>Word * </p>
                        <input type='text' placeholder="Enter New Word..." />
                    <p className="para">Fields marked * are mandatory</p>
                    <hr />
                    <button className="add-btn" onClick={this.addToDB.bind(this)}>Add</button>
                </div>
            </div>
        );
    }
}

export default FloatBtnPopup;