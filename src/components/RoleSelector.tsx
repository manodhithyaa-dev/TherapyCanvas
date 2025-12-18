import { UserRole } from '@/types/therapy';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Sparkles } from 'lucide-react';

interface RoleSelectorProps {
  onSelectRole: (role: UserRole) => void;
}

export function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Therapy Made Inclusive</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            Welcome to{' '}
            <span className="text-gradient-warm">TherapyCanvas</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Create interactive therapy activities with Indian cultural context. 
            Drag, drop, and build engaging learning experiences.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Tutor Card */}
          <button
            onClick={() => onSelectRole('tutor')}
            className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-glow-primary transition-all duration-300 text-left border-2 border-transparent hover:border-primary/20"
          >
            <div className="absolute top-4 right-4 w-20 h-20 gradient-warm rounded-full opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative">
              <div className="w-16 h-16 gradient-warm rounded-2xl flex items-center justify-center mb-6 shadow-glow-primary">
                <GraduationCap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                I'm a Therapist / Educator
              </h2>
              <p className="text-muted-foreground mb-6">
                Create custom activities, build visual schedules, design matching games, 
                and share your content with families.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Drag-and-drop activity builder
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Indian cultural asset library
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Multi-language support
                </li>
              </ul>
              <Button variant="tutor" className="w-full">
                Start Creating
              </Button>
            </div>
          </button>

          {/* Family Card */}
          <button
            onClick={() => onSelectRole('family')}
            className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-glow-secondary transition-all duration-300 text-left border-2 border-transparent hover:border-secondary/20"
          >
            <div className="absolute top-4 right-4 w-20 h-20 gradient-cool rounded-full opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative">
              <div className="w-16 h-16 gradient-cool rounded-2xl flex items-center justify-center mb-6 shadow-glow-secondary">
                <Users className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                I'm a Parent / Caregiver
              </h2>
              <p className="text-muted-foreground mb-6">
                Access activities shared by your therapist, practice with your child, 
                and track progress together.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Simple, child-friendly interface
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Works offline
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Voice & audio support
                </li>
              </ul>
              <Button variant="family" className="w-full">
                Start Learning
              </Button>
            </div>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Made with ❤️ for inclusive therapy in India • Supports 10+ languages
        </p>
      </div>
    </div>
  );
}
