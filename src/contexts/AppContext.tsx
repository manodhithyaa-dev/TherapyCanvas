import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, Activity, Language } from '@/types/therapy';

interface AppContextType {
  userRole: UserRole | null;
  setUserRole: (role: UserRole | null) => void;
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  currentActivity: Activity | null;
  setCurrentActivity: (activity: Activity | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        currentLanguage,
        setCurrentLanguage,
        activities,
        setActivities,
        currentActivity,
        setCurrentActivity,
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
