import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, Users, Sparkles, ArrowLeft } from 'lucide-react';
import { UserRole, IndianRegion } from '@/types/therapy';
import { indianRegions } from '@/data/regions';

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [role, setRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [region, setRegion] = useState<IndianRegion>('north');
  const [error, setError] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!role) {
      setError('Please select your role');
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Simulate signup - in real app, this would call an API
    const mockUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      region: role === 'tutor' ? region : undefined,
      createdAt: new Date(),
    };

    setUser(mockUser);
    navigate('/');
  };

  if (!role) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Join TherapyCanvas</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Create Your Account
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose your role to get started
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => setRole('tutor')}
              className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-glow-primary transition-all duration-300 text-left border-2 border-transparent hover:border-primary/20"
            >
              <div className="absolute top-4 right-4 w-20 h-20 gradient-warm rounded-full opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 gradient-warm rounded-2xl flex items-center justify-center mb-6 shadow-glow-primary">
                  <GraduationCap className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Therapist / Educator
                </h2>
                <p className="text-muted-foreground">
                  Create and share therapy activities with families
                </p>
              </div>
            </button>

            <button
              onClick={() => setRole('family')}
              className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-glow-secondary transition-all duration-300 text-left border-2 border-transparent hover:border-secondary/20"
            >
              <div className="absolute top-4 right-4 w-20 h-20 gradient-cool rounded-full opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 gradient-cool rounded-2xl flex items-center justify-center mb-6 shadow-glow-secondary">
                  <Users className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Parent / Caregiver
                </h2>
                <p className="text-muted-foreground">
                  Access activities and support your child's learning
                </p>
              </div>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="p-8 shadow-soft">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRole(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                role === 'tutor' ? 'gradient-warm' : 'gradient-cool'
              }`}>
                {role === 'tutor' ? (
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                ) : (
                  <Users className="w-6 h-6 text-secondary-foreground" />
                )}
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Sign Up as {role === 'tutor' ? 'Therapist' : 'Parent'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Create your account to get started
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {role === 'tutor' && (
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={region} onValueChange={(value) => setRegion(value as IndianRegion)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {indianRegions.map((reg) => (
                      <SelectItem key={reg.code} value={reg.code}>
                        {reg.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" variant={role === 'tutor' ? 'tutor' : 'family'}>
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/login" className="text-primary hover:underline">
              Already have an account? Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

