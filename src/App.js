import React, { useState, useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Search, Github, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

import { Trie, DEFAULT_DICTIONARY } from './utils/TrieDataStructure';
import { AutoCompleteInput } from './components/AutoCompleteInput';
import { TrieVisualization } from './components/TrieVisualization';
import { ActivityFeed } from './components/ActivityFeed';
import { FeatureShowcase } from './components/FeatureShowcase';
import { HowItWorks } from './components/HowItWorks';
import { TechnicalDetails } from './components/TechnicalDetails';

const Home = () => {
  const [trie, setTrie] = useState(null);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({ accepted: 0, rejected: 0, added: 0 });

  // Initialize Trie with default dictionary
  useEffect(() => {
    const newTrie = new Trie();
    DEFAULT_DICTIONARY.forEach(({ word, frequency }) => {
      newTrie.insert(word, frequency);
    });
    setTrie(newTrie);
  }, []);

  const handleWordAccepted = (word) => {
    setActivities(prev => [{
      type: 'accepted',
      word,
      timestamp: new Date()
    }, ...prev].slice(0, 50)); // Keep last 50 activities
    
    setStats(prev => ({ ...prev, accepted: prev.accepted + 1 }));
    toast.success(`Accepted: ${word}`, {
      description: 'Word frequency increased'
    });
  };

  const handleWordRejected = (word) => {
    setActivities(prev => [{
      type: 'rejected',
      word,
      timestamp: new Date()
    }, ...prev].slice(0, 50));
    
    setStats(prev => ({ ...prev, rejected: prev.rejected + 1 }));
    toast.error(`Rejected: ${word}`, {
      description: 'Suggestion hidden'
    });
  };

  const handleWordAdded = (word) => {
    setActivities(prev => [{
      type: 'added',
      word,
      timestamp: new Date()
    }, ...prev].slice(0, 50));
    
    setStats(prev => ({ ...prev, added: prev.added + 1 }));
    toast.success(`Added: ${word}`, {
      description: 'New word added to dictionary'
    });
    
    // Force re-render to update stats
    setTrie(prevTrie => {
      const newTrie = new Trie();
      const copyTrie = (sourceNode, targetNode, prefix = '') => {
        if (sourceNode.isEndOfWord) {
          newTrie.insert(sourceNode.word, sourceNode.frequency);
        }
        for (let char in sourceNode.children) {
          copyTrie(sourceNode.children[char], targetNode, prefix + char);
        }
      };
      copyTrie(prevTrie.root, newTrie.root);
      return newTrie;
    });
  };

  if (!trie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading AutoSuggest Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  AutoSuggest
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Text Prediction Engine
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://your-tutorial-link.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Documentation
                </Button>
              </a>

              <a
                href="https://github.com/yourusername/autosuggest"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow"
            style={{ animationDelay: '1s' }}
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Educational Demo Project
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Experience the Magic of
              <br />
              <span className="text-gradient-primary">Predictive Text</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Build your own autocomplete system using Trie data structures. 
              Watch how efficient algorithms power the typing experiences you use every day.
            </p>
          </div>

          {/* Interactive Demo */}
          <div className="flex flex-col items-center gap-8 mb-16">
            <AutoCompleteInput
              trie={trie}
              onWordAccepted={handleWordAccepted}
              onWordRejected={handleWordRejected}
              onWordAdded={handleWordAdded}
            />
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>{stats.accepted} Accepted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <span>{stats.rejected} Rejected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>{stats.added} Added</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <TrieVisualization trie={trie} />
            <ActivityFeed activities={activities} />
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* How It Works */}
      <HowItWorks />

      {/* Technical Details */}
      <TechnicalDetails />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Build Your Own?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            This project demonstrates real-world applications of data structures. 
            Perfect for computer science students learning algorithms!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/yourusername/autosuggest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="shadow-primary">
                <Github className="w-5 h-5 mr-2" />
                View Source Code
              </Button>
            </a>

            <a
              href="https://your-tutorial-link.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline">
                <BookOpen className="w-5 h-5 mr-2" />
                Read Tutorial
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">AutoSuggest</p>
                <p className="text-xs text-muted-foreground">Powered by Trie Data Structure</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">About</a>
              <a href="https://your-tutorial-link.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Documentation</a>
              <a href="https://github.com/yourusername/autosuggest" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            <p>Educational project demonstrating text prediction algorithms • Built with React & Tailwind CSS</p>
          </div>
        </div>
      </footer>

      <Toaster position="bottom-right" />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
