import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="vocab-heading">
                    <h1>Vocab</h1>
                    <input type="text" class="search" placeholder="search" name="search" value="" />
                </div>  
                <div className="wordlist-heading">
                    <h3>Words List</h3>
                </div>
            </div>
        )
    }
}

export default Header;