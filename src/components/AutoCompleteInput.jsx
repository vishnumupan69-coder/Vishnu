import React, { useState, useRef, useEffect } from 'react';
import { Check, X, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const AutoCompleteInput = ({ trie, onWordAccepted, onWordRejected, onWordAdded }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue.trim().length > 0) {
      const results = trie.getSuggestions(inputValue, 5, 'frequency');
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setSelectedIndex(0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, trie]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter' && inputValue.trim()) {
        handleAddNewWord();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (suggestions[selectedIndex]) {
          handleAcceptSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
      default:
        break;
    }
  };

  const handleAcceptSuggestion = (suggestion) => {
    setInputValue(suggestion.word);
    trie.incrementFrequency(suggestion.word);
    setShowSuggestions(false);
    onWordAccepted?.(suggestion.word);
    
    // Clear input after accepting
    setTimeout(() => {
      setInputValue('');
      inputRef.current?.focus();
    }, 300);
  };

  const handleRejectSuggestion = (suggestion, e) => {
    e.stopPropagation();
    setSuggestions(prev => prev.filter(s => s.word !== suggestion.word));
    onWordRejected?.(suggestion.word);
  };

  const handleAddNewWord = () => {
    const word = inputValue.trim();
    if (word && !trie.search(word)) {
      trie.insert(word, 1);
      onWordAdded?.(word);
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const highlightMatch = (word, prefix) => {
    const index = word.toLowerCase().indexOf(prefix.toLowerCase());
    if (index === -1) return word;

    return (
      <>
        <span className="font-semibold text-primary">
          {word.substring(0, index + prefix.length)}
        </span>
        <span className="text-foreground">
          {word.substring(index + prefix.length)}
        </span>
      </>
    );
  };

  return (
    <div className="relative w-full max-w-2xl">
      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue && setShowSuggestions(suggestions.length > 0)}
          placeholder="Start typing to see suggestions..."
          className="w-full px-6 py-4 text-lg bg-card border-2 border-border rounded-xl focus:outline-none focus:border-primary focus:shadow-primary transition-smooth placeholder:text-muted-foreground"
        />
        
        {inputValue && (
          <button
            onClick={() => setInputValue('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-smooth"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute w-full mt-2 p-2 z-50 border-2 shadow-lg animate-slide-up">
          <div className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.word}
                onClick={() => handleAcceptSuggestion(suggestion)}
                className={`group flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-smooth ${
                  index === selectedIndex
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex flex-col">
                    <span className="text-base font-medium">
                      {highlightMatch(suggestion.word, inputValue)}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <TrendingUp className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Used {suggestion.frequency} times
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAcceptSuggestion(suggestion);
                    }}
                    className="p-2 rounded-lg bg-primary/10 text-primary opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground transition-smooth"
                    title="Accept"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleRejectSuggestion(suggestion, e)}
                    className="p-2 rounded-lg bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground transition-smooth"
                    title="Reject"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Keyboard Hints */}
          <div className="mt-3 pt-3 border-t border-border px-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs px-2 py-0.5">↑↓</Badge>
                Navigate
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs px-2 py-0.5">Enter</Badge>
                Accept
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs px-2 py-0.5">Esc</Badge>
                Close
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Add New Word Hint */}
      {inputValue && suggestions.length === 0 && (
        <Card className="absolute w-full mt-2 p-4 z-50 border-2 border-dashed border-primary/30 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                No suggestions found
              </p>
              <div className="text-xs text-muted-foreground mt-1">
                Press <Badge variant="outline" className="mx-1 text-xs">Enter</Badge> to add "{inputValue}" to dictionary
              </div>
            </div>
            <button
              onClick={handleAddNewWord}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth text-sm font-medium"
            >
              Add Word
            </button>
          </div>
        </Card>
      )}
    </div>
  );
};