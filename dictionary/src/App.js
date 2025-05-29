import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Snackbar } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import FloatingButton from './components/floatingButton/FloatingButton';
import Header from './components/header/Header';
import WordContainer from './components/wordContainer/WordContainer';
import axios from 'axios';
import './App.css';

// Create Material-UI theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';  const testAPIConnection = async () => {
    try {
      await axios.get(`${API_BASE_URL}/health`);
      showNotification(`API Connected to ${API_BASE_URL}`, 'success');
    } catch (error) {
      console.error('API Connection failed:', error.message);
      showNotification(`API Connection failed: ${error.message}`, 'error');
    }
  };// Test API connection on component mount
  useEffect(() => {
    testAPIConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const searchWord = async (searchTerm) => {
    if (!searchTerm || searchTerm.trim().length === 0) {
      showNotification('Please enter a word to search', 'warning');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}/word/${encodeURIComponent(searchTerm.trim())}`;
      const response = await axios.get(url);
      
      if (response.data.success && response.data.data) {
        const newWord = response.data.data;
        
        // Check if word already exists in the list
        const existingWordIndex = words.findIndex(w => w.word.toLowerCase() === newWord.word.toLowerCase());
        
        if (existingWordIndex !== -1) {
          // Update existing word
          const updatedWords = [...words];
          updatedWords[existingWordIndex] = { ...newWord, id: Date.now() };
          setWords(updatedWords);
          showNotification(`Updated definition for "${newWord.word}"`, 'success');
        } else {
          // Add new word to the beginning of the list
          setWords(prevWords => {
            const newWordList = [{ ...newWord, id: Date.now() }, ...prevWords];
            return newWordList;
          });
          showNotification(`Added "${newWord.word}" to your dictionary`, 'success');
        }
      } else {
        throw new Error('No definition found');
      }    } catch (error) {
      if (error.response?.status === 404) {
        setError(`No definition found for "${searchTerm}"`);
        showNotification(`No definition found for "${searchTerm}"`, 'error');
      } else if (error.response?.status === 500) {
        setError('Dictionary service is unavailable. Please try again later.');
        showNotification('Dictionary service is unavailable', 'error');
      } else if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        setError(`Cannot connect to API server at ${API_BASE_URL}`);
        showNotification(`Cannot connect to API server at ${API_BASE_URL}`, 'error');
      } else {
        setError(`Failed to search: ${error.message}`);
        showNotification(`Search failed: ${error.message}`, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const removeWord = (wordId) => {
    setWords(prevWords => prevWords.filter(word => word.id !== wordId));
    showNotification('Word removed from your list', 'info');
  };

  const clearAllWords = () => {
    setWords([]);
    showNotification('All words cleared', 'info');
  };

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header 
          onSearch={searchWord} 
          loading={loading}
          wordCount={words.length}
          onClearAll={clearAllWords}
        />
        
        <Container maxWidth="lg" className="main-content">
          <div className="word-box">
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}
            
            {words.length === 0 && !loading && !error && (
              <div className="empty-state">
                <h3>Start searching for words!</h3>
                <p>Use the search bar above to look up word definitions and build your personal dictionary.</p>
              </div>
            )}
            
            {words.map((word) => (
              <WordContainer 
                key={word.id}
                wordData={word}
                onRemove={() => removeWord(word.id)}
              />
            ))}
            
            {loading && (
              <div className="loading-container">
                <p>Searching for word definition...</p>
              </div>
            )}
          </div>
        </Container>
        
        <FloatingButton onSearch={searchWord} />
        
        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseNotification} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

export default App;
