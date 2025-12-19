import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { languages } from '@/data/assets';
import { ArrowLeft, Globe, Sparkles, User, LogOut, Store, Settings } from 'lucide-react';
import { Language } from '@/types/therapy';
import { useNavigate } from 'react-router-dom';
import { setGoogleLanguage } from '@/lib/setLanguage';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Header({ showBack, onBack, title }: HeaderProps) {
  const { user, userRole, setUserRole, currentLanguage, setCurrentLanguage, logout } = useApp();
  const navigate = useNavigate();

  const handleLanguageChange = (value: string) => {
    const lang = value as Language;
    setCurrentLanguage(lang);
    // Set Google Translate language
    setGoogleLanguage(lang);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          {showBack && (
            <Button variant="ghost" size="icon-sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="flex items-center gap-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              userRole === 'tutor' ? 'gradient-warm' : 'gradient-cool'
            }`}>
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">
              {title || 'TherapyCanvas'}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Select 
            value={currentLanguage} 
            onValueChange={handleLanguageChange}
          >
            <SelectTrigger className="w-[140px] h-9">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className="text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs text-muted-foreground font-normal">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/marketplace')}>
                  <Store className="w-4 h-4 mr-2" />
                  Marketplace
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button 
                size="sm"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}