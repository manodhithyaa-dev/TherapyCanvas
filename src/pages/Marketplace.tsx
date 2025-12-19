import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Heart,
  Globe,
  Users,
  TrendingUp,
  Clock,
  Check,
  ShoppingCart,
  Loader2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { MarketplaceActivity, IndianRegion, Language, ActivityType } from '@/types/therapy';
import { indianRegions } from '@/data/regions';
import { languages } from '@/data/assets';
import { marketplaceApi, purchaseApi } from '@/lib/api';
import { PurchaseButton } from '@/components/marketplace/PurchaseButton';

// Fallback mock marketplace data
const mockMarketplaceActivities: MarketplaceActivity[] = [
  {
    id: 'market-1',
    title: 'Hindi Emotions Board',
    type: 'aac-board',
    language: 'hindi',
    description: 'Learn emotions in Hindi with culturally relevant examples',
    elements: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    authorId: 'tutor-1',
    isPublished: true,
    tags: ['emotions', 'hindi', 'aac'],
    author: {
      id: 'tutor-1',
      name: 'Dr. Priya Sharma',
      region: 'north',
      rating: 4.8,
    },
    price: 0,
    pricingModel: 'free',
    purchaseCount: 234,
    rating: 4.7,
    reviewCount: 45,
    ageRange: { min: 3, max: 8 },
    therapyGoals: ['communication', 'emotional-regulation'],
  },
  {
    id: 'market-2',
    title: 'South Indian Food Matching',
    type: 'matching',
    language: 'tamil',
    description: 'Match Tamil food names with pictures',
    elements: [],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    authorId: 'tutor-2',
    isPublished: true,
    tags: ['food', 'tamil', 'matching'],
    author: {
      id: 'tutor-2',
      name: 'Dr. Ramesh Kumar',
      region: 'south',
      rating: 4.9,
    },
    price: 99,
    pricingModel: 'paid',
    purchaseCount: 156,
    rating: 4.8,
    reviewCount: 32,
    ageRange: { min: 4, max: 10 },
    therapyGoals: ['cognitive', 'vocabulary'],
  },
  {
    id: 'market-3',
    title: 'Daily Routine Visual Schedule',
    type: 'visual-schedule',
    language: 'hindi',
    description: 'Complete morning to night routine in Hindi',
    elements: [],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    authorId: 'tutor-3',
    isPublished: true,
    tags: ['routine', 'hindi', 'schedule'],
    author: {
      id: 'tutor-3',
      name: 'Ms. Anjali Patel',
      region: 'west',
      rating: 4.6,
    },
    price: 0,
    pricingModel: 'free',
    purchaseCount: 412,
    rating: 4.9,
    reviewCount: 78,
    ageRange: { min: 2, max: 6 },
    therapyGoals: ['independence', 'routine'],
  },
];

export default function Marketplace() {
  const { user, publishedActivities, purchaseActivity, isPurchased } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<IndianRegion | 'all'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>('all');
  const [selectedType, setSelectedType] = useState<ActivityType | 'all'>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [activities, setActivities] = useState<MarketplaceActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMarketplaceActivities();
  }, [selectedRegion, selectedLanguage, selectedType, priceFilter, searchQuery]);

  const loadMarketplaceActivities = async () => {
    try {
      setLoading(true);
      const response = await marketplaceApi.getMarketplaceActivities({
        region: selectedRegion === 'all' ? undefined : selectedRegion,
        language: selectedLanguage === 'all' ? undefined : selectedLanguage,
        type: selectedType === 'all' ? undefined : selectedType,
        price: priceFilter,
        search: searchQuery || undefined,
      });

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
        thumbnail: a.thumbnail,
        previewUrl: a.previewUrl,
      }));

      // Combine with locally published activities
      const allActivities = [...publishedActivities, ...convertedActivities];
      setActivities(allActivities);
    } catch (err: any) {
      console.error('Error loading marketplace activities:', err);
      // Fallback to mock data
      setActivities([...publishedActivities, ...mockMarketplaceActivities]);
      toast({
        title: 'Using Demo Data',
        description: 'Could not connect to backend. Showing sample activities.',
        variant: 'default',
      });
    } finally {
      setLoading(false);
    }
  };

  const allActivities = activities;

  const filteredActivities = allActivities.filter((activity) => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || activity.author.region === selectedRegion;
    const matchesLanguage = selectedLanguage === 'all' || activity.language === selectedLanguage;
    const matchesType = selectedType === 'all' || activity.type === selectedType;
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'free' && activity.pricingModel === 'free') ||
                        (priceFilter === 'paid' && activity.pricingModel === 'paid');

    return matchesSearch && matchesRegion && matchesLanguage && matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header title="Marketplace" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Therapy Content Marketplace
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover, purchase, and use therapy activities created by therapists across India
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8 shadow-soft">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedRegion} onValueChange={(value) => setSelectedRegion(value as IndianRegion | 'all')}>
              <SelectTrigger>
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {indianRegions.map((region) => (
                  <SelectItem key={region.code} value={region.code}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as Language | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.nativeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={(value) => setPriceFilter(value as 'all' | 'free' | 'paid')}>
              <SelectTrigger>
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="w-12 h-12 gradient-warm rounded-full flex items-center justify-center mx-auto mb-2">
              <Download className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="font-display font-bold text-2xl text-foreground">{filteredActivities.length}</div>
            <div className="text-sm text-muted-foreground">Activities</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-12 h-12 gradient-cool rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div className="font-display font-bold text-2xl text-foreground">
              {new Set(filteredActivities.map(a => a.authorId)).size}
            </div>
            <div className="text-sm text-muted-foreground">Therapists</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="font-display font-bold text-2xl text-foreground">
              {filteredActivities.filter(a => a.pricingModel === 'free').length}
            </div>
            <div className="text-sm text-muted-foreground">Free</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 text-muted-foreground fill-accent" />
            </div>
            <div className="font-display font-bold text-2xl text-foreground">
              {filteredActivities.length > 0 
                ? (filteredActivities.reduce((sum, a) => sum + a.rating, 0) / filteredActivities.length).toFixed(1)
                : '0'}
            </div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </Card>
        </div>

        {/* Activities Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Available Activities
            </h2>
            <Badge variant="secondary">
              {filteredActivities.length} results
            </Badge>
          </div>

          {loading ? (
            <Card className="p-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Loading activities...</h3>
            </Card>
          ) : filteredActivities.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No activities found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <Card 
                  key={activity.id}
                  className="overflow-hidden hover:shadow-medium transition-all group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-muted to-background flex items-center justify-center relative">
                    <span className="text-6xl group-hover:scale-110 transition-transform">
                      {activity.type === 'matching' && '🎯'}
                      {activity.type === 'visual-schedule' && '📅'}
                      {activity.type === 'aac-board' && '💬'}
                      {activity.type === 'sequencing' && '🔢'}
                      {activity.type === 'social-story' && '📖'}
                      {activity.type === 'yes-no-cards' && '✅'}
                    </span>
                    {activity.pricingModel === 'free' && (
                      <Badge className="absolute top-3 right-3 bg-success">
                        Free
                      </Badge>
                    )}
                    {activity.pricingModel === 'paid' && (
                      <Badge className="absolute top-3 right-3 bg-primary">
                        ₹{activity.price}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground line-clamp-1 flex-1">
                        {activity.title}
                      </h3>
                      <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {activity.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {languages.find(l => l.code === activity.language)?.nativeName}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {indianRegions.find(r => r.code === activity.author.region)?.name}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-sm font-medium">{activity.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({activity.reviewCount})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Download className="w-3 h-3" />
                        <span>{activity.purchaseCount}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Users className="w-3 h-3" />
                      <span>{activity.author.name}</span>
                      {activity.author.rating && (
                        <>
                          <span>•</span>
                          <Star className="w-3 h-3 text-accent fill-accent" />
                          <span>{activity.author.rating}</span>
                        </>
                      )}
                    </div>

                    <PurchaseButton
                      activity={activity}
                      user={user}
                      isPurchased={isPurchased(activity.id)}
                      purchaseActivity={purchaseActivity}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

