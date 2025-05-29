require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');
const demoWords = require('./demo-data');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Simple file-based storage (optional - for word history)
const STORAGE_FILE = path.join(__dirname, 'word_history.json');

// Initialize storage file
const initializeStorage = async () => {
    try {
        await fs.access(STORAGE_FILE);
        console.log('📁 Word history file found');
    } catch (error) {
        // File doesn't exist, create it
        await fs.writeFile(STORAGE_FILE, JSON.stringify([]));
        console.log('📁 Created new word history file');
    }
};

// Save word to history (optional feature)
const saveWordToHistory = async (wordData) => {
    try {
        const data = await fs.readFile(STORAGE_FILE, 'utf8');
        const history = JSON.parse(data);
        
        // Check if word already exists
        const existingIndex = history.findIndex(item => 
            item.word.toLowerCase() === wordData.word.toLowerCase()
        );
        
        const wordEntry = {
            ...wordData,
            timestamp: new Date().toISOString(),
            searchCount: existingIndex !== -1 ? history[existingIndex].searchCount + 1 : 1
        };
        
        if (existingIndex !== -1) {
            history[existingIndex] = wordEntry;
        } else {
            history.unshift(wordEntry);
        }
        
        // Keep only last 100 words
        const limitedHistory = history.slice(0, 100);
        await fs.writeFile(STORAGE_FILE, JSON.stringify(limitedHistory, null, 2));
        
    } catch (error) {
        console.warn('⚠️ Failed to save word to history:', error.message);
    }
};

// Free Dictionary API Configuration
const DICTIONARY_API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

// Routes

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Dictionary API is running',
        timestamp: new Date().toISOString()
    });
});

// Get word history endpoint (optional feature)
app.get('/history', async (req, res) => {
    try {
        const data = await fs.readFile(STORAGE_FILE, 'utf8');
        const history = JSON.parse(data);
        
        res.status(200).json({
            success: true,
            history: history.slice(0, 20), // Return last 20 words
            total: history.length
        });
    } catch (error) {
        res.status(200).json({
            success: true,
            history: [],
            total: 0
        });
    }
});

// Get word definition
app.get('/word/:word', async (req, res) => {
    try {
        const { word } = req.params;
        
        if (!word || word.trim().length === 0) {
            return res.status(400).json({
                error: 'Word parameter is required',
                success: false
            });
        }        const cleanWord = word.toLowerCase().trim();

        // Try the free Dictionary API first
        try {
            const apiUrl = `${DICTIONARY_API_BASE_URL}/${cleanWord}`;
            console.log(`🔍 Fetching definition for: ${cleanWord} from free API`);

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                
                // Extract and format the word data from the new API
                const formattedData = extractWordDataFromFreeAPI(data, cleanWord);
                
                // Save to history
                if (formattedData) {
                    await saveWordToHistory(formattedData);
                }

                return res.status(200).json({
                    success: true,
                    word: cleanWord,
                    data: formattedData,
                    timestamp: new Date().toISOString(),
                    source: 'dictionaryapi.dev'
                });
            }
        } catch (apiError) {
            console.warn(`⚠️ Free API failed: ${apiError.message}`);
        }

        // Fallback to demo data if API fails
        const demoWord = demoWords[cleanWord.toLowerCase()];
        if (demoWord) {
            await saveWordToHistory(demoWord);
            return res.status(200).json({
                success: true,
                word: cleanWord,
                data: demoWord,
                timestamp: new Date().toISOString(),
                source: 'demo'
            });
        }

        // If both API and demo fail
        return res.status(404).json({
            error: 'Word not found',
            success: false,
            word: cleanWord,
            message: 'No definition found for this word'
        });

    } catch (error) {
        console.error('❌ Error fetching word definition:', error.message);
        
        res.status(500).json({
            error: 'Failed to fetch word definition',
            success: false,
            message: error.message,
            word: req.params.word
        });
    }
});

// Extract and format word data from Oxford API response
// Extract and format word data from the free Dictionary API
function extractWordDataFromFreeAPI(apiResponse, word) {
    try {
        if (!Array.isArray(apiResponse) || apiResponse.length === 0) {
            return null;
        }

        const wordData = apiResponse[0];
        const meanings = wordData.meanings || [];
        const formattedEntries = [];

        meanings.forEach(meaning => {
            const partOfSpeech = meaning.partOfSpeech || 'Unknown';
            const definitions = meaning.definitions || [];

            definitions.forEach(def => {
                const pronunciation = extractPronunciationFromFreeAPI(wordData);
                
                formattedEntries.push({
                    partOfSpeech,
                    definition: def.definition,
                    examples: def.example ? [def.example] : [],
                    pronunciation
                });
            });
        });

        return {
            word,
            entries: formattedEntries.slice(0, 8), // Limit to 8 entries for better variety
            totalEntries: formattedEntries.length
        };

    } catch (error) {
        console.error('Error formatting word data from free API:', error);
        return null;
    }
}

// Extract pronunciation from free API response
function extractPronunciationFromFreeAPI(wordData) {
    try {
        const phonetics = wordData.phonetics || [];
        
        // Find the first phonetic with text
        const phoneticWithText = phonetics.find(p => p.text);
        if (phoneticWithText) {
            return phoneticWithText.text.replace(/[\/\[\]]/g, ''); // Remove slashes and brackets
        }
        
        return '';
    } catch (error) {
        return '';
    }
}

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        success: false,
        availableEndpoints: [
            'GET /health - Health check',
            'GET /word/:word - Get word definition'
        ]
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('❌ Unhandled error:', error);
    res.status(500).json({
        error: 'Internal server error',
        success: false,
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

// Start server
const startServer = async () => {
    try {
        await initializeStorage();
        
        app.listen(PORT, () => {            console.log(`🚀 Dictionary API server running on port ${PORT}`);
            console.log(`📚 Health check: http://localhost:${PORT}/health`);
            console.log(`🔍 Example usage: http://localhost:${PORT}/word/hello`);
            console.log(`📖 Word history: http://localhost:${PORT}/history`);
            console.log(`🆓 Using free Dictionary API: ${DICTIONARY_API_BASE_URL}`);
            
            if (process.env.NODE_ENV === 'development') {
                console.log(`🌍 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
            }
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('👋 SIGINT received, shutting down gracefully');
    process.exit(0);
});

startServer();