import React, { useState } from 'react';
import { 
    TextField, 
    InputAdornment, 
    IconButton, 
    CircularProgress 
} from '@material-ui/core';
import { Search, Clear } from '@material-ui/icons';

function SearchBar({ onSubmit, loading }) {
    const [term, setTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedTerm = term.trim();
        if (trimmedTerm && onSubmit) {
            onSubmit(trimmedTerm);
        }
    };

    const handleClear = () => {
        setTerm('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">            <TextField
                variant="outlined"
                size="medium"
                placeholder="Type any word to explore its meaning..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                className="search-input"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {loading ? (
                                <CircularProgress size={20} />
                            ) : (
                                <Search />
                            )}
                        </InputAdornment>
                    ),
                    endAdornment: term && (
                        <InputAdornment position="end">
                            <IconButton
                                size="small"
                                onClick={handleClear}
                                disabled={loading}
                                edge="end"
                                aria-label="Clear search"
                            >
                                <Clear />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </form>
    );
}
export default SearchBar;
