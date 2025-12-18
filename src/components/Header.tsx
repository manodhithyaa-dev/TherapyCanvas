import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { languages } from '@/data/assets';
import { ArrowLeft, Globe, Sparkles } from 'lucide-react';
import { Language } from '@/types/therapy';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Header({ showBack, onBack, title }: HeaderProps) {
  const { userRole, setUserRole, currentLanguage, setCurrentLanguage } = useApp();

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
          <div className="flex items-center gap-2">
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
            onValueChange={(value) => setCurrentLanguage(value as Language)}
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
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setUserRole(null)}
          >
            Switch Role
          </Button>
        </div>
      </div>
    </header>
  );
}
