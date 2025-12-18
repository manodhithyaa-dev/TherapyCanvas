import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Header } from '@/components/Header';
import { AuthoringStudio } from './AuthoringStudio';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Plus, 
  FolderOpen, 
  Clock, 
  TrendingUp,
  Users,
  FileText,
  Play
} from 'lucide-react';

type View = 'dashboard' | 'studio';

export function TutorDashboard() {
  const { activities, setCurrentActivity } = useApp();
  const [view, setView] = useState<View>('dashboard');

  if (view === 'studio') {
    return <AuthoringStudio />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back, Therapist! 👋
          </h1>
          <p className="text-muted-foreground">
            Create engaging therapy activities for your students
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card 
            className="p-5 cursor-pointer hover:shadow-medium transition-all group"
            onClick={() => setView('studio')}
          >
            <div className="w-12 h-12 gradient-warm rounded-xl flex items-center justify-center mb-4 shadow-glow-primary group-hover:scale-105 transition-transform">
              <Plus className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Create Activity</h3>
            <p className="text-sm text-muted-foreground">Start from template or blank</p>
          </Card>

          <Card className="p-5 cursor-pointer hover:shadow-medium transition-all group">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <FolderOpen className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">My Activities</h3>
            <p className="text-sm text-muted-foreground">{activities.length} activities</p>
          </Card>

          <Card className="p-5 cursor-pointer hover:shadow-medium transition-all group">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">My Students</h3>
            <p className="text-sm text-muted-foreground">3 students</p>
          </Card>

          <Card className="p-5 cursor-pointer hover:shadow-medium transition-all group">
            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Analytics</h3>
            <p className="text-sm text-muted-foreground">View progress</p>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Recent Activities
            </h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>

          {activities.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No activities yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first therapy activity to get started
              </p>
              <Button onClick={() => setView('studio')}>
                <Plus className="w-4 h-4 mr-2" />
                Create Activity
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {activities.slice(0, 6).map((activity) => (
                <Card 
                  key={activity.id} 
                  className="p-4 cursor-pointer hover:shadow-medium transition-all group"
                  onClick={() => setCurrentActivity(activity)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 gradient-warm rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                    {activity.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(activity.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Templates */}
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Quick Start Templates
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: '🎯', name: 'Matching Game', color: 'from-primary to-accent' },
              { icon: '📅', name: 'Visual Schedule', color: 'from-secondary to-[hsl(190_70%_50%)]' },
              { icon: '💬', name: 'AAC Board', color: 'from-[hsl(280_60%_50%)] to-[hsl(320_60%_50%)]' },
              { icon: '🔢', name: 'Sequencing', color: 'from-[hsl(160_60%_45%)] to-secondary' },
            ].map((template) => (
              <Card 
                key={template.name}
                className="p-4 cursor-pointer hover:shadow-medium transition-all group"
                onClick={() => setView('studio')}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  <span className="text-2xl">{template.icon}</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{template.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
