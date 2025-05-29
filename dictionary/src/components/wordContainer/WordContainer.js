import React, { useState } from 'react';
import { 
    Card, 
    CardContent, 
    Typography, 
    Chip, 
    IconButton, 
    Collapse,
    List,
    ListItem,
    ListItemText,
    Divider,
    Box
} from '@material-ui/core';
import { 
    ExpandMore, 
    ExpandLess, 
    VolumeUp, 
    Delete
} from '@material-ui/icons';

function WordContainer({ wordData, onRemove }) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!wordData) {
        return null;
    }

    const { word, entries = [] } = wordData;
    const primaryEntry = entries[0] || {};
    const additionalEntries = entries.slice(1);    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        if (onRemove) {
            onRemove();
        }
    };

    const speakWord = (e) => {
        e.stopPropagation();
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
        }
    };

    const formatExamples = (examples) => {
        if (!examples || examples.length === 0) return '';
        return examples.map(example => `"${example}"`).join(', ');
    };

    return (
        <>
            <Card className="word-container" elevation={2}>
                <CardContent>
                    <Box className="word-header">
                        <Box className="word-title-section">
                            <Typography variant="h5" component="h3" className="word-title">
                                {word}
                            </Typography>
                            {primaryEntry.pronunciation && (
                                <Typography variant="body2" className="pronunciation">
                                    /{primaryEntry.pronunciation}/
                                </Typography>
                            )}
                        </Box>
                        
                        <Box className="word-actions">
                            <IconButton size="small" onClick={speakWord} title="Pronounce word">
                                <VolumeUp />
                            </IconButton>
                            <IconButton size="small" onClick={handleRemove} title="Remove word">
                                <Delete />
                            </IconButton>
                        </Box>
                    </Box>

                    {primaryEntry.partOfSpeech && (
                        <Chip 
                            label={primaryEntry.partOfSpeech} 
                            size="small" 
                            variant="outlined"
                            className="part-of-speech-chip"
                        />
                    )}

                    {primaryEntry.definition && (
                        <Typography variant="body1" className="definition" paragraph>
                            {primaryEntry.definition}
                        </Typography>
                    )}

                    {primaryEntry.examples && primaryEntry.examples.length > 0 && (
                        <Typography variant="body2" className="examples" color="textSecondary">
                            <strong>Example:</strong> {formatExamples(primaryEntry.examples)}
                        </Typography>
                    )}

                    {additionalEntries.length > 0 && (
                        <Box className="additional-entries">
                            <IconButton 
                                size="small" 
                                onClick={toggleExpanded}
                                className="expand-button"
                            >
                                {isExpanded ? <ExpandLess /> : <ExpandMore />}
                                <Typography variant="body2">
                                    {additionalEntries.length} more definition{additionalEntries.length > 1 ? 's' : ''}
                                </Typography>
                            </IconButton>

                            <Collapse in={isExpanded}>
                                <List dense>
                                    {additionalEntries.map((entry, index) => (
                                        <div key={index}>
                                            <ListItem>
                                                <ListItemText
                                                    primary={
                                                        <Box>
                                                            {entry.partOfSpeech && (
                                                                <Chip 
                                                                    label={entry.partOfSpeech} 
                                                                    size="small" 
                                                                    variant="outlined"
                                                                    style={{ marginRight: 8, marginBottom: 4 }}
                                                                />
                                                            )}
                                                            <Typography variant="body2">
                                                                {entry.definition}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                    secondary={entry.examples && entry.examples.length > 0 ? 
                                                        `Example: ${formatExamples(entry.examples)}` : null
                                                    }
                                                />
                                            </ListItem>
                                            {index < additionalEntries.length - 1 && <Divider />}
                                        </div>
                                    ))}
                                </List>
                            </Collapse>
                        </Box>                    )}
                </CardContent>
            </Card>
        </>
    );
}

export default WordContainer