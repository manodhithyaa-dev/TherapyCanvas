import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { GraduationCap, Users, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import { UserRole, IndianRegion } from '@/types/therapy';
import { authApi } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [role, setRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!role) {
      setError('Please select your role');
      setLoading(false);
      return;
    }

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.login({ email, password });

      // Verify role matches
      if (response.user.role !== role) {
        setError(`This account is registered as a ${response.user.role}, not ${role}`);
        setLoading(false);
        return;
      }

      // Convert backend user format to frontend format
      const user = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        role: response.user.role as UserRole,
        region: response.user.region as IndianRegion | undefined,
        avatar: response.user.avatar,
        createdAt: new Date(response.user.createdAt),
        lastLoginAt: response.user.lastLoginAt ? new Date(response.user.lastLoginAt) : undefined,
      };

      setUser(user);
      toast({
        title: 'Welcome Back!',
        description: `Logged in as ${user.name}`,
      });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
      toast({
        title: 'Login Failed',
        description: err.message || 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!role) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Welcome Back</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Sign In to <span className="text-gradient-warm">TherapyCanvas</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose your role to continue
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
                  Access your authoring studio and manage your activities
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
                  Access activities and track your child's progress
                </p>
              </div>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign up
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
                  Sign In as {role === 'tutor' ? 'Therapist' : 'Parent'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your credentials to continue
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              variant={role === 'tutor' ? 'tutor' : 'family'}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/signup" className="text-primary hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

