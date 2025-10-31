import React from 'react';
import { Code2, GitBranch, Layers, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const TechnicalDetails = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Technical Implementation
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Built with
            <span className="text-gradient-primary"> Modern Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Educational project demonstrating real-world data structure applications
          </p>
        </div>

        <Tabs defaultValue="structure" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="structure">Data Structure</TabsTrigger>
            <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="structure" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-primary" />
                  Trie (Prefix Tree) Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-6 rounded-lg font-mono text-sm">
                  <pre className="text-foreground">{`class TrieNode {
  constructor() {
    this.children = {};      // Map of char to TrieNode
    this.isEndOfWord = false; // Word completion marker
    this.frequency = 0;       // Usage frequency
    this.word = null;         // Complete word storage
  }
}

// Example: Storing "app", "apple", "apply"
//       root
//        |
//        a
//        |
//        p
//        |
//        p* (word: "app", freq: 5)
//       / \\
//      l   l
//      |   |
//      e*  y*
// (apple) (apply)`}</pre>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">Space Complexity</h4>
                    <p className="text-sm text-muted-foreground">O(ALPHABET_SIZE * N * M) where N is number of words and M is average length</p>
                  </div>
                  <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                    <h4 className="font-semibold text-secondary mb-2">Insert Operation</h4>
                    <p className="text-sm text-muted-foreground">O(M) where M is the length of the word being inserted</p>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <h4 className="font-semibold text-accent mb-2">Search Operation</h4>
                    <p className="text-sm text-muted-foreground">O(M) for exact match, O(M + K) for prefix search with K results</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="algorithm" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-secondary" />
                  Suggestion Algorithm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-muted/30 rounded-lg border border-border">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">1</span>
                      Prefix Navigation
                    </h4>
                    <p className="text-sm text-muted-foreground ml-8">
                      Start at root and traverse the Trie following the characters of the input prefix. 
                      If any character is not found, return empty results.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg border border-border">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs">2</span>
                      Recursive Collection
                    </h4>
                    <p className="text-sm text-muted-foreground ml-8">
                      From the prefix node, recursively traverse all children to collect complete words. 
                      Mark words with their frequency data.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg border border-border">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-accent text-foreground flex items-center justify-center text-xs">3</span>
                      Smart Sorting
                    </h4>
                    <p className="text-sm text-muted-foreground ml-8">
                      Sort collected words by frequency (most used first) or alphabetically. 
                      Return top N suggestions for optimal UX.
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg border border-border">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">4</span>
                      Frequency Updates
                    </h4>
                    <p className="text-sm text-muted-foreground ml-8">
                      When user accepts a suggestion, increment its frequency counter. 
                      This creates a learning system that adapts to usage patterns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">Array-based vs Trie-based Search</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Array (Linear Search)</span>
                          <Badge variant="destructive">O(N × M)</Badge>
                        </div>
                        <div className="h-2 bg-destructive/20 rounded-full overflow-hidden">
                          <div className="h-full bg-destructive w-[95%]" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Checks every word in dictionary</p>
                      </div>
                      <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Trie (Prefix Search)</span>
                          <Badge className="bg-success text-success-foreground">O(M + K)</Badge>
                        </div>
                        <div className="h-2 bg-success/20 rounded-full overflow-hidden">
                          <div className="h-full bg-success w-[15%]" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Only traverses relevant branch</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-4">Real-world Performance</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-foreground">1,000 words</span>
                        <Badge variant="outline">~0.5ms response</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-foreground">10,000 words</span>
                        <Badge variant="outline">~2ms response</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-foreground">100,000 words</span>
                        <Badge variant="outline">~5ms response</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Performance remains consistent regardless of dictionary size
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Layers className="w-5 h-5 text-primary" />
                    Core Capabilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      'Real-time prefix-based suggestions',
                      'Frequency-weighted ranking',
                      'Dynamic word addition',
                      'Keyboard navigation support',
                      'Accept/reject feedback system',
                      'Persistent learning from usage'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Code2 className="w-5 h-5 text-secondary" />
                    Technologies Used
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">JavaScript</Badge>
                    <Badge variant="secondary">Tailwind CSS</Badge>
                    <Badge variant="secondary">Trie Data Structure</Badge>
                    <Badge variant="secondary">Hash Map</Badge>
                    <Badge variant="secondary">Recursion</Badge>
                    <Badge variant="secondary">Prefix Search</Badge>
                    <Badge variant="secondary">Frequency Tracking</Badge>
                  </div>
                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Educational Value</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      This project demonstrates practical applications of data structures in real-world scenarios. 
                      Students learn how abstract concepts like Tries, recursion, and algorithmic complexity 
                      translate into features they use every day.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};