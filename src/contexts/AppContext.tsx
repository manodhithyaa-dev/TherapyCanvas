import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserRole, Activity, Language, User, MarketplaceActivity, Purchase } from '@/types/therapy';

interface AppContextType {
  userRole: UserRole | null;
  setUserRole: (role: UserRole | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  currentActivity: Activity | null;
  setCurrentActivity: (activity: Activity | null) => void;
  publishedActivities: MarketplaceActivity[];
  setPublishedActivities: React.Dispatch<React.SetStateAction<MarketplaceActivity[]>>;
  purchases: Purchase[];
  setPurchases: React.Dispatch<React.SetStateAction<Purchase[]>>;
  publishActivity: (activity: Activity, marketplaceData: any) => void;
  purchaseActivity: (activityId: string, price: number) => boolean;
  isPurchased: (activityId: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Load user from localStorage on mount
    const saved = localStorage.getItem('therapyUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [publishedActivities, setPublishedActivities] = useState<MarketplaceActivity[]>(() => {
    // Load published activities from localStorage
    const saved = localStorage.getItem('publishedActivities');
    return saved ? JSON.parse(saved) : [];
  });
  const [purchases, setPurchases] = useState<Purchase[]>(() => {
    // Load purchases from localStorage
    const saved = localStorage.getItem('purchases');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('therapyUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('therapyUser');
    }
  }, [user]);

  // Sync published activities to localStorage
  useEffect(() => {
    localStorage.setItem('publishedActivities', JSON.stringify(publishedActivities));
  }, [publishedActivities]);

  // Sync purchases to localStorage
  useEffect(() => {
    localStorage.setItem('purchases', JSON.stringify(purchases));
  }, [purchases]);

  // For demo mode: allow role selection without user
  const [demoRole, setDemoRole] = useState<UserRole | null>(null);
  const userRole = user?.role || demoRole;

  const setUserRole = (role: UserRole | null) => {
    if (role && user) {
      setUser({ ...user, role });
    } else if (role && !user) {
      // Demo mode: set role without user
      setDemoRole(role);
    } else if (!role) {
      setUser(null);
      setDemoRole(null);
    }
  };

  const publishActivity = (activity: Activity, marketplaceData: any) => {
    const marketplaceActivity: MarketplaceActivity = {
      ...activity,
      ...marketplaceData,
      author: user && user.role === 'tutor' ? {
        id: user.id,
        name: user.name,
        region: (user as any).region || 'north',
        avatar: user.avatar,
        rating: 4.5, // Default rating
      } : {
        id: 'unknown',
        name: 'Unknown',
        region: 'north',
      },
      purchaseCount: 0,
      rating: 0,
      reviewCount: 0,
      isPublished: true,
    };

    setPublishedActivities([...publishedActivities, marketplaceActivity]);
  };

  const purchaseActivity = (activityId: string, price: number): boolean => {
    if (!user) return false;

    // Check if already purchased
    if (purchases.some(p => p.activityId === activityId && p.userId === user.id)) {
      return false;
    }

    const purchase: Purchase = {
      id: `purchase-${Date.now()}`,
      userId: user.id,
      activityId,
      price,
      purchasedAt: new Date(),
    };

    setPurchases([...purchases, purchase]);

    // Update purchase count in published activity
    setPublishedActivities(publishedActivities.map(activity => 
      activity.id === activityId 
        ? { ...activity, purchaseCount: activity.purchaseCount + 1 }
        : activity
    ));

    return true;
  };

  const isPurchased = (activityId: string): boolean => {
    if (!user) return false;
    return purchases.some(p => p.activityId === activityId && p.userId === user.id);
  };

  const logout = () => {
    setUser(null);
    setActivities([]);
    setCurrentActivity(null);
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        user,
        setUser,
        currentLanguage,
        setCurrentLanguage,
        activities,
        setActivities,
        currentActivity,
        setCurrentActivity,
        publishedActivities,
        setPublishedActivities,
        purchases,
        setPurchases,
        publishActivity,
        purchaseActivity,
        isPurchased,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
