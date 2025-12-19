import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Header } from '@/components/Header';
import { ActivityPlayer } from './ActivityPlayer';
import { TutorSelector } from './TutorSelector';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Star, 
  Clock,
  Trophy,
  Heart,
  Sparkles,
  Users,
  BookOpen,
  ShoppingBag,
  Check,
  Loader2
} from 'lucide-react';
import { Activity, CanvasElement, MarketplaceActivity } from '@/types/therapy';
import { purchaseApi } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

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
  const { user, activities, currentActivity, setCurrentActivity, publishedActivities, purchases, isPurchased } = useApp();
  const [playingActivity, setPlayingActivity] = useState<Activity | null>(null);
  const [selectedTutorId, setSelectedTutorId] = useState<string | undefined>(
    (user as any)?.selectedTutorId
  );
  const [activeTab, setActiveTab] = useState<'activities' | 'tutors' | 'purchases'>('tutors');
  const [purchasedActivities, setPurchasedActivities] = useState<MarketplaceActivity[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(false);
  
  const allActivities = [...sampleActivities, ...activities];
  
  useEffect(() => {
    if (user?.id && activeTab === 'purchases') {
      loadPurchases();
    }
  }, [user?.id, activeTab]);

  const loadPurchases = async () => {
    if (!user?.id) return;
    
    try {
      setLoadingPurchases(true);
      const response = await purchaseApi.getUserPurchases(user.id);
      
      // Convert backend format to frontend format
      const convertedActivities: MarketplaceActivity[] = response.activities.map((a: any) => ({
        id: a.id,
        title: a.title,
        type: a.type as any,
        language: a.language as any,
        description: a.description || '',
        elements: a.elements || [],
        createdAt: new Date(a.createdAt),
        updatedAt: new Date(a.updatedAt),
        authorId: a.authorId,
        isPublished: a.isPublished,
        tags: a.tags || [],
        author: a.author || {
          id: a.authorId,
          name: 'Unknown',
          region: 'north',
        },
        price: a.price || 0,
        pricingModel: a.pricingModel || 'free',
        purchaseCount: a.purchaseCount || 0,
        rating: a.rating || 0,
        reviewCount: a.reviewCount || 0,
        ageRange: a.ageRange,
        therapyGoals: a.therapyGoals || [],
        diagnosisTags: a.diagnosisTags || [],
      }));
      
      setPurchasedActivities(convertedActivities);
    } catch (err: any) {
      console.error('Error loading purchases:', err);
      // Fallback to local purchases
      const localPurchased = publishedActivities.filter(activity => 
        purchases.some(p => p.activityId === activity.id && p.userId === user?.id)
      );
      setPurchasedActivities(localPurchased);
    } finally {
      setLoadingPurchases(false);
    }
  };

  const handleSelectTutor = (tutorId: string) => {
    setSelectedTutorId(tutorId);
    setActiveTab('activities');
    // In a real app, this would save to the user's profile
    if (user) {
      const updatedUser = { ...user, selectedTutorId: tutorId };
      // Update user in context
    }
  };

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
            Hello{user?.name ? `, ${user.name}` : ''}! 🌟
          </h1>
          <p className="text-muted-foreground">
            {selectedTutorId 
              ? 'Tap on an activity to start playing'
              : 'Select a therapist to access their activities'}
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'activities' | 'tutors' | 'purchases')} className="mb-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="tutors" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Select Therapist
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="purchases" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              My Purchases
              {purchasedActivities.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {purchasedActivities.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tutors" className="mt-6">
            <TutorSelector 
              selectedTutorId={selectedTutorId}
              onSelectTutor={handleSelectTutor}
            />
          </TabsContent>

          <TabsContent value="activities" className="mt-6">
            {!selectedTutorId ? (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No Therapist Selected</h3>
                <p className="text-muted-foreground mb-4">
                  Please select a therapist first to view their activities
                </p>
                <Button onClick={() => setActiveTab('tutors')}>
                  Select Therapist
                </Button>
              </Card>
            ) : (
              <>

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
              </>
            )}
          </TabsContent>

          <TabsContent value="purchases" className="mt-6">
            {loadingPurchases ? (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Loading purchases...</h3>
              </Card>
            ) : purchasedActivities.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No Purchases Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Purchase activities from the marketplace to see them here
                </p>
                <Button onClick={() => window.location.href = '/marketplace'}>
                  Browse Marketplace
                </Button>
              </Card>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                    My Purchased Activities
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {purchasedActivities.length} activity{purchasedActivities.length !== 1 ? 'ies' : ''} purchased
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {purchasedActivities.map((activity) => (
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
                        <Badge className="absolute top-3 right-3 bg-success">
                          <Check className="w-3 h-3 mr-1" />
                          Owned
                        </Badge>
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
                          <span>{activity.rating || 'New'}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
