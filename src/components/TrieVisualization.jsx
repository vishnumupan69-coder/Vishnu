import React from 'react';
import { Network, Database, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const TrieVisualization = ({ trie }) => {
  const stats = trie.getStats();

  return (
    <Card className="border-2 hover:shadow-md transition-smooth">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Network className="w-5 h-5 text-primary" />
          Trie Data Structure Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Words */}
          <div className="flex flex-col p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Total Words
              </span>
            </div>
            <span className="text-3xl font-bold text-primary">
              {stats.totalWords.toLocaleString()}
            </span>
          </div>

          {/* Total Nodes */}
          <div className="flex flex-col p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20">
            <div className="flex items-center gap-2 mb-2">
              <Network className="w-4 h-4 text-secondary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Trie Nodes
              </span>
            </div>
            <span className="text-3xl font-bold text-secondary">
              {stats.totalNodes.toLocaleString()}
            </span>
          </div>

          {/* Max Depth */}
          <div className="flex flex-col p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Max Depth
              </span>
            </div>
            <span className="text-3xl font-bold text-accent">
              {stats.maxDepth}
            </span>
          </div>
        </div>

        {/* Simple Visual Representation */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm font-medium text-foreground mb-3">Structure Efficiency</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min((stats.totalWords / stats.totalNodes) * 100, 100)}%` 
                }}
              />
            </div>
            <Badge variant="secondary" className="text-xs">
              {((stats.totalWords / stats.totalNodes) * 100).toFixed(1)}% Compression
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Trie stores {stats.totalWords} words using only {stats.totalNodes} nodes
          </p>
        </div>
      </CardContent>
    </Card>
  );
};