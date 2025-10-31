import React from 'react';
import { Zap, Database, TrendingUp, Plus, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const FeatureShowcase = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Suggestions',
      description: 'Get real-time word predictions as you type, powered by efficient Trie data structure.',
      color: 'primary',
      gradient: 'from-primary/20 to-primary/5'
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Smart Dictionary',
      description: 'Pre-loaded with common words and learns from your typing patterns over time.',
      color: 'secondary',
      gradient: 'from-secondary/20 to-secondary/5'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Frequency Ranking',
      description: 'Most used words appear first, making suggestions more relevant to your needs.',
      color: 'accent',
      gradient: 'from-accent/20 to-accent/5'
    },
    {
      icon: <Plus className="w-6 h-6" />,
      title: 'Add Custom Words',
      description: 'Easily expand the dictionary with your own words and technical terms.',
      color: 'primary',
      gradient: 'from-primary/10 to-primary/5'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Accept or Reject',
      description: 'Full control over suggestions with quick accept/reject actions.',
      color: 'success',
      gradient: 'from-success/20 to-success/5'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Key Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need for
            <span className="text-gradient-primary"> Smart Text Prediction</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the power of data structures in action with our intuitive autocomplete system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-2 hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden group"
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 text-${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};