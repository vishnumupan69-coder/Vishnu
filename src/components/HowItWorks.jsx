import React from 'react';
import { Keyboard, Network, Cpu, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: <Keyboard className="w-8 h-8" />,
      title: 'User Input',
      description: 'As you type characters, the system captures your input prefix in real-time.',
      color: 'primary'
    },
    {
      number: '02',
      icon: <Network className="w-8 h-8" />,
      title: 'Trie Search',
      description: 'The prefix is used to navigate through the Trie data structure, finding all matching words efficiently.',
      color: 'secondary'
    },
    {
      number: '03',
      icon: <Cpu className="w-8 h-8" />,
      title: 'Suggestion Engine',
      description: 'Words are collected and sorted by frequency or alphabetically, giving you the most relevant results.',
      color: 'accent'
    },
    {
      number: '04',
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Display & Feedback',
      description: 'Top suggestions appear instantly, and your acceptance/rejection feedback improves future predictions.',
      color: 'primary'
    }
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            From Keystroke to
            <span className="text-gradient-accent"> Smart Suggestion</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Understanding the algorithm behind intelligent text prediction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-primary/40 to-transparent -translate-y-1/2 z-0" />
              )}
              
              <Card className="relative border-2 hover:shadow-lg transition-all duration-300 overflow-hidden group h-full">
                <div className="p-6">
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-5xl font-bold text-muted/20 group-hover:text-muted/30 transition-colors">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${step.color}/20 to-${step.color}/5 border-2 border-${step.color}/20 flex items-center justify-center mb-4 text-${step.color} group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Technical Details */}
        <div className="mt-12 p-6 bg-card border-2 border-border rounded-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Network className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Why Trie Data Structure?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                A Trie (prefix tree) is perfect for autocomplete because it organizes words by their prefixes. 
                This means searching for all words starting with "pro" is incredibly fast - we just navigate to the "p-r-o" 
                path and collect all complete words from that branch.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">O(k) lookup time</Badge>
                <Badge variant="secondary">Space efficient</Badge>
                <Badge variant="secondary">Fast prefix search</Badge>
                <Badge variant="secondary">Dynamic updates</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};