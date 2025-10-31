import React from 'react';
import { CheckCircle, XCircle, PlusCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export const ActivityFeed = ({ activities }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'added':
        return <PlusCircle className="w-4 h-4 text-primary" />;
      default:
        return <TrendingUp className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getActionText = (type) => {
    switch (type) {
      case 'accepted':
        return 'Accepted suggestion';
      case 'rejected':
        return 'Rejected suggestion';
      case 'added':
        return 'Added new word';
      default:
        return 'Activity';
    }
  };

  const getBadgeVariant = (type) => {
    switch (type) {
      case 'accepted':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'added':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="border-2 hover:shadow-md transition-smooth">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                No activities yet. Start typing to see suggestions!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth border border-transparent hover:border-border"
                >
                  <div className="mt-0.5">{getIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.word}
                      </p>
                      <Badge 
                        variant={getBadgeVariant(activity.type)} 
                        className="text-xs px-2 py-0"
                      >
                        {getActionText(activity.type)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};