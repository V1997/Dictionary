import React, { useState } from 'react';
import { CircularProgress, IconButton } from '@material-ui/core';
import { Close as CloseIcon, Add as AddIcon } from '@material-ui/icons';

const FloatBtnPopup = ({ closePopup, onSearch }) => {
    const [word, setWord] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate input
        if (!word.trim()) {
            setError('Please enter a word');
            return;
        }

        // Check if word contains only letters
        if (!/^[a-zA-Z\s-']+$/.test(word.trim())) {
            setError('Please enter a valid word (letters only)');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Use the search function from App.js to add the word
            await onSearch(word.trim());
            
            // Close popup after successful addition
            setWord('');
            closePopup();
        } catch (err) {
            setError('Failed to add word. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setWord(e.target.value);
        if (error) setError(''); // Clear error when user starts typing
    };

    return (
        <div className='popup-overlay' onClick={closePopup}>
            <div className='popup-content' onClick={(e) => e.stopPropagation()}>
                <div className='popup-header'>
                    <h2>Add New Word</h2>
                    <IconButton 
                        onClick={closePopup} 
                        className="close-button"
                        size="small"
                    >
                        <CloseIcon />
                    </IconButton>
                </div>

                <form onSubmit={handleSubmit} className="popup-form">
                    <div className="input-group">
                        <label htmlFor="word-input">Word *</label>
                        <input 
                            id="word-input"
                            type='text' 
                            placeholder="Enter a word to look up..." 
                            value={word}
                            onChange={handleInputChange}
                            disabled={loading}
                            autoFocus
                            className={error ? 'error' : ''}
                        />
                        {error && <span className="error-text">{error}</span>}
                    </div>

                    <p className="help-text">
                        * Enter any English word to get its definition and add it to your dictionary
                    </p>

                    <div className="popup-actions">
                        <button 
                            type="button" 
                            onClick={closePopup}
                            className="cancel-btn"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="add-btn"
                            disabled={loading || !word.trim()}
                        >
                            {loading ? (
                                <>
                                    <CircularProgress size={16} color="inherit" />
                                    <span>Adding...</span>
                                </>
                            ) : (
                                <>
                                    <AddIcon />
                                    <span>Add Word</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FloatBtnPopup;