
import FloatingButton from './components/floatingButton/FloatingButton';
import Header from './components/header/Header';
import WordContainer from './components/wordContainer/WordContainer';
import React from 'react';
class App extends React.Component {
  // constructor(props) {
  //     super(props);
  //     this.state = { apiResponse: "" };
  //   }

  //   callAPI() {
  //       fetch("http://localhost:8000/hello")
  //           .then(res => res.text())
  //           .then(res => this.setState({ apiResponse: res }))
  //           .catch(err => console.log('vasu patel',err));
  //   }

  //   componentDidMount() {
  //       this.callAPI();
  //   }
render() {
  return (
      <div className="App">
        
        <Header />
        <div className="word-box">
          <WordContainer />
        {/* <h1 className="App-intro">Thisis api call::   {this.state.apiResponse}</h1> */}
          <WordContainer />
          <WordContainer />
          <WordContainer />
          <WordContainer />
          <WordContainer />
          <WordContainer />
          <WordContainer />
          <WordContainer />
          <WordContainer />
          <WordContainer />
          <WordContainer />
          <WordContainer />
        </div>
          <FloatingButton />  
        
        {/* <Body /> */}
      </div>
    );
  }
}

export default App;
