import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Header } from '@/components/Header';
import { ActivityPlayer } from './ActivityPlayer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Play, 
  Star, 
  Clock,
  Trophy,
  Heart,
  Sparkles
} from 'lucide-react';
import { Activity, CanvasElement } from '@/types/therapy';

// Sample activities for demo
const sampleActivities: Activity[] = [
  {
    id: 'sample-1',
    title: 'Match the Fruits',
    type: 'matching',
    language: 'english',
    description: 'Match fruits with their names',
    elements: [
      // Drop zones
      {
        id: 'drop-1',
        type: 'shape',
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        content: 'rectangle',
        style: { backgroundColor: 'hsl(38 30% 92%)', borderColor: 'hsl(28 89% 52%)', borderWidth: 3, borderRadius: 16 },
        isDropZone: true,
      },
      {
        id: 'drop-2',
        type: 'shape',
        x: 250,
        y: 100,
        width: 100,
        height: 100,
        content: 'rectangle',
        style: { backgroundColor: 'hsl(38 30% 92%)', borderColor: 'hsl(28 89% 52%)', borderWidth: 3, borderRadius: 16 },
        isDropZone: true,
      },
      {
        id: 'drop-3',
        type: 'shape',
        x: 400,
        y: 100,
        width: 100,
        height: 100,
        content: 'rectangle',
        style: { backgroundColor: 'hsl(38 30% 92%)', borderColor: 'hsl(28 89% 52%)', borderWidth: 3, borderRadius: 16 },
        isDropZone: true,
      },
      // Labels
      {
        id: 'label-1',
        type: 'text',
        x: 100,
        y: 210,
        width: 100,
        height: 30,
        content: 'Apple',
        style: { fontSize: 16, fontColor: 'hsl(25 30% 15%)' },
      },
      {
        id: 'label-2',
        type: 'text',
        x: 250,
        y: 210,
        width: 100,
        height: 30,
        content: 'Banana',
        style: { fontSize: 16, fontColor: 'hsl(25 30% 15%)' },
      },
      {
        id: 'label-3',
        type: 'text',
        x: 400,
        y: 210,
        width: 100,
        height: 30,
        content: 'Mango',
        style: { fontSize: 16, fontColor: 'hsl(25 30% 15%)' },
      },
      // Draggable items
      {
        id: 'item-1',
        type: 'image',
        x: 100,
        y: 350,
        width: 80,
        height: 80,
        content: '🍎',
        style: { backgroundColor: 'hsl(0 0% 100%)', borderColor: 'hsl(38 25% 88%)', borderWidth: 2, borderRadius: 16 },
      },
      {
        id: 'item-2',
        type: 'image',
        x: 250,
        y: 350,
        width: 80,
        height: 80,
        content: '🍌',
        style: { backgroundColor: 'hsl(0 0% 100%)', borderColor: 'hsl(38 25% 88%)', borderWidth: 2, borderRadius: 16 },
      },
      {
        id: 'item-3',
        type: 'image',
        x: 400,
        y: 350,
        width: 80,
        height: 80,
        content: '🥭',
        style: { backgroundColor: 'hsl(0 0% 100%)', borderColor: 'hsl(38 25% 88%)', borderWidth: 2, borderRadius: 16 },
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: 'sample',
    isPublished: true,
    tags: ['fruits', 'matching'],
  },
  {
    id: 'sample-2',
    title: 'Morning Routine',
    type: 'visual-schedule',
    language: 'english',
    description: 'Learn morning activities',
    elements: [
      {
        id: 'routine-1',
        type: 'image',
        x: 50,
        y: 100,
        width: 100,
        height: 100,
        content: '🌅',
        style: { backgroundColor: 'hsl(0 0% 100%)', borderColor: 'hsl(38 25% 88%)', borderWidth: 2, borderRadius: 16 },
      },
      {
        id: 'routine-2',
        type: 'image',
        x: 200,
        y: 100,
        width: 100,
        height: 100,
        content: '🪥',
        style: { backgroundColor: 'hsl(0 0% 100%)', borderColor: 'hsl(38 25% 88%)', borderWidth: 2, borderRadius: 16 },
      },
      {
        id: 'routine-3',
        type: 'image',
        x: 350,
        y: 100,
        width: 100,
        height: 100,
        content: '🛁',
        style: { backgroundColor: 'hsl(0 0% 100%)', borderColor: 'hsl(38 25% 88%)', borderWidth: 2, borderRadius: 16 },
      },
      {
        id: 'routine-4',
        type: 'image',
        x: 500,
        y: 100,
        width: 100,
        height: 100,
        content: '🍳',
        style: { backgroundColor: 'hsl(0 0% 100%)', borderColor: 'hsl(38 25% 88%)', borderWidth: 2, borderRadius: 16 },
      },
      {
        id: 'label-r1',
        type: 'text',
        x: 50,
        y: 210,
        width: 100,
        height: 30,
        content: 'Wake Up',
        style: { fontSize: 14, fontColor: 'hsl(25 30% 15%)' },
      },
      {
        id: 'label-r2',
        type: 'text',
        x: 200,
        y: 210,
        width: 100,
        height: 30,
        content: 'Brush',
        style: { fontSize: 14, fontColor: 'hsl(25 30% 15%)' },
      },
      {
        id: 'label-r3',
        type: 'text',
        x: 350,
        y: 210,
        width: 100,
        height: 30,
        content: 'Bath',
        style: { fontSize: 14, fontColor: 'hsl(25 30% 15%)' },
      },
      {
        id: 'label-r4',
        type: 'text',
        x: 500,
        y: 210,
        width: 100,
        height: 30,
        content: 'Breakfast',
        style: { fontSize: 14, fontColor: 'hsl(25 30% 15%)' },
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: 'sample',
    isPublished: true,
    tags: ['routine', 'morning'],
  },
  {
    id: 'sample-3',
    title: 'Emotions',
    type: 'aac-board',
    language: 'hindi',
    description: 'Learn about emotions',
    elements: [
      {
        id: 'emo-1',
        type: 'image',
        x: 100,
        y: 100,
        width: 120,
        height: 120,
        content: '😊',
        style: { backgroundColor: 'hsl(0 0% 100%)', borderColor: 'hsl(120 50% 45%)', borderWidth: 3, borderRadius: 20 },
      },
      {
        id: 'emo-2',
        type: 'image',
        x: 280,
        y: 100,
        width: 120,
        height: 120,
        content: '😢',
        style: { backgroundColor: 'hsl(0 0% 100%)', borderColor: 'hsl(210 70% 50%)', borderWidth: 3, borderRadius: 20 },
      },
      {
        id: 'emo-3',
        type: 'image',
        x: 460,
        y: 100,
        width: 120,
        height: 120,
        content: '😠',
        style: { backgroundColor: 'hsl(0 0% 100%)', borderColor: 'hsl(0 70% 50%)', borderWidth: 3, borderRadius: 20 },
      },
      {
        id: 'label-e1',
        type: 'text',
        x: 100,
        y: 230,
        width: 120,
        height: 30,
        content: 'खुश',
        style: { fontSize: 18, fontColor: 'hsl(25 30% 15%)' },
      },
      {
        id: 'label-e2',
        type: 'text',
        x: 280,
        y: 230,
        width: 120,
        height: 30,
        content: 'उदास',
        style: { fontSize: 18, fontColor: 'hsl(25 30% 15%)' },
      },
      {
        id: 'label-e3',
        type: 'text',
        x: 460,
        y: 230,
        width: 120,
        height: 30,
        content: 'गुस्सा',
        style: { fontSize: 18, fontColor: 'hsl(25 30% 15%)' },
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: 'sample',
    isPublished: true,
    tags: ['emotions', 'hindi'],
  },
];

export function FamilyDashboard() {
  const { activities, currentActivity, setCurrentActivity } = useApp();
  const [playingActivity, setPlayingActivity] = useState<Activity | null>(null);
  
  const allActivities = [...sampleActivities, ...activities];

  if (playingActivity) {
    return (
      <ActivityPlayer 
        activity={playingActivity}
        onBack={() => setPlayingActivity(null)}
        onComplete={() => {
          // Could track completion here
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-secondary" />
            <span className="text-sm font-medium text-secondary">Let's Learn Together!</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Hello, Little Learner! 🌟
          </h1>
          <p className="text-muted-foreground">
            Tap on an activity to start playing
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="w-12 h-12 gradient-warm rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="font-display font-bold text-2xl text-foreground">12</div>
            <div className="text-sm text-muted-foreground">Stars Earned</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-12 h-12 gradient-cool rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div className="font-display font-bold text-2xl text-foreground">3</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="font-display font-bold text-2xl text-foreground">5</div>
            <div className="text-sm text-muted-foreground">Favorites</div>
          </Card>
        </div>

        {/* Activities Grid */}
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Your Activities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allActivities.map((activity) => (
              <Card 
                key={activity.id}
                className="overflow-hidden cursor-pointer hover:shadow-glow-primary transition-all group"
                onClick={() => setPlayingActivity(activity)}
              >
                <div className="aspect-square bg-gradient-to-br from-muted to-background flex items-center justify-center relative">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    {activity.type === 'matching' && '🎯'}
                    {activity.type === 'visual-schedule' && '📅'}
                    {activity.type === 'aac-board' && '💬'}
                    {activity.type === 'sequencing' && '🔢'}
                    {activity.type === 'social-story' && '📖'}
                    {activity.type === 'yes-no-cards' && '✅'}
                  </span>
                  <Button 
                    variant="warm"
                    size="icon-lg"
                    className="absolute bottom-3 right-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Play className="w-6 h-6 fill-current" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                    {activity.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>5 min</span>
                    <span className="mx-1">•</span>
                    <Star className="w-3 h-3 text-accent fill-accent" />
                    <span>Easy</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
