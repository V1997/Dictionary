import React from "react";
class SearchBar extends React.Component {
  state = {
    term: ""
  };
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
  };
  render() {
    return ( <form onSubmit={this.onFormSubmit} >
            <input
              type="text"
              className="search" 
              placeholder="search" 
              name="search"
              value={this.state.term}
              onChange={(e) =>
                this.setState({
                  term: e.target.value.toLocaleLowerCase()
                })
              }
            />
        </form>
     );
  }
}
export default SearchBar;
