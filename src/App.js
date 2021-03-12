
import FloatingButton from './components/floatingButton/FloatingButton';
import Header from './components/header/Header';
import WordContainer from './components/wordContainer/WordContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="word-box">
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
        <WordContainer />
      </div>
        <FloatingButton />  
      {/* <Body /> */}
    </div>
  );
}

export default App;
