import React, { useEffect, useState } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Badge,
    IconButton,
    Tooltip 
} from '@material-ui/core';
import { 
    MenuBook, 
    Clear 
} from '@material-ui/icons';
import SearchBar from './SearchBar';
import './Header.css';

function Header({ onSearch, loading, wordCount, onClearAll }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            setIsScrolled(scrollTop > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearchSubmit = (term) => {
        if (onSearch) {
            onSearch(term);
        }
    };

    const handleClearAll = () => {
        if (wordCount > 0 && onClearAll) {
            const confirmed = window.confirm(`Are you sure you want to clear all ${wordCount} words from your list?`);
            if (confirmed) {
                onClearAll();
            }
        }
    };    return (
        <AppBar position="static" className={`header ${isScrolled ? 'scrolled' : ''}`} elevation={0}>
            <Toolbar>
                <div className="header-content">
                    <div className="vocab-heading">
                        <Tooltip title="Your Personal Dictionary" placement="bottom">
                            <MenuBook className="vocab-icon" />
                        </Tooltip>
                        <Typography variant="h4" component="h1" className="vocab-title">
                            Dictionary
                        </Typography>
                        <SearchBar 
                            onSubmit={handleSearchSubmit} 
                            loading={loading}
                        />
                    </div>                    <div className="header-actions">
                        <Tooltip 
                            title={wordCount === 0 ? "No words saved yet" : `You have ${wordCount} word${wordCount !== 1 ? 's' : ''} in your collection`}
                            placement="bottom"
                        >
                            <div className="word-counter">
                                <Badge 
                                    badgeContent={wordCount} 
                                    color="secondary" 
                                    className="word-count-badge"
                                    max={999}
                                    showZero={true}
                                >
                                    <Typography variant="h6" className="wordlist-heading">
                                        My Collection
                                    </Typography>
                                </Badge>
                            </div>
                        </Tooltip>
                        
                        {wordCount > 0 && (
                            <Tooltip title={`Clear all ${wordCount} word${wordCount !== 1 ? 's' : ''} from your collection`} placement="bottom">
                                <IconButton 
                                    color="inherit" 
                                    onClick={handleClearAll}
                                    className="clear-button"
                                    size="medium"
                                    aria-label={`Clear all ${wordCount} words`}
                                >
                                    <Clear />
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;