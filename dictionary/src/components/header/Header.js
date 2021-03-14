import React from 'react';
import keyword from './keyword';
import SearchBar from './SearchBar';

class Header extends React.Component {
    // state = { images: [] };
    constructor(props) {
        super(props);
        this.state = { term: ''};
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    // constructor(props) {
    //   super(props);
    //   this.state = { apiResponse: "" };
    // }

    // callAPI() {
        // fetch("http://localhost:8000/hello")
        //     .then(res => res.text())
        //     .then(res => this.setState({ apiResponse: res }))
        //     .catch(err => console.log('vasu patel',err));
    // }

    // componentDidMount() {
    //     this.callAPI();
    // }

    onSearchSubmit = async (term) => {
        fetch(`http://localhost:8000/${term}`)
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => console.log('vasu patel',err));
        // const response = await keyword.get(`${term}`)
        // .then(response => console.log('data has been gotten', response))
        // .catch(err => console.log('something went wrong', err));
        // this.setState({ images: response.data.results });
    };
    render() {
        return (
            <div className="header">
                <div className="vocab-heading">
                    <h1>Vocab</h1>
                    {/* <input type="text" className="search" placeholder="search" name="search" value="" /> */}
                    <SearchBar onSubmit={this.onSearchSubmit} />
                </div>
                <div className="wordlist-heading">
                    <h3>Words List</h3>
                </div>
            </div>
        )
    }
}

export default Header;