import { activityTemplates } from '@/data/assets';
import { Template, ActivityType } from '@/types/therapy';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Puzzle, 
  Calendar, 
  MessageSquare, 
  ListOrdered, 
  BookOpen, 
  CheckCircle,
  Plus
} from 'lucide-react';

const typeIcons: Record<ActivityType, React.ReactNode> = {
  'matching': <Puzzle className="w-6 h-6" />,
  'visual-schedule': <Calendar className="w-6 h-6" />,
  'aac-board': <MessageSquare className="w-6 h-6" />,
  'sequencing': <ListOrdered className="w-6 h-6" />,
  'social-story': <BookOpen className="w-6 h-6" />,
  'yes-no-cards': <CheckCircle className="w-6 h-6" />,
  'phonics': <span className="text-2xl font-bold">Aa</span>,
};

const typeColors: Record<ActivityType, string> = {
  'matching': 'from-primary to-accent',
  'visual-schedule': 'from-secondary to-[hsl(190_70%_50%)]',
  'aac-board': 'from-[hsl(280_60%_50%)] to-[hsl(320_60%_50%)]',
  'sequencing': 'from-[hsl(160_60%_45%)] to-secondary',
  'social-story': 'from-primary to-[hsl(350_70%_55%)]',
  'yes-no-cards': 'from-[hsl(120_50%_45%)] to-[hsl(160_50%_45%)]',
  'phonics': 'from-accent to-primary',
};

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void;
  onCreateBlank: () => void;
}

export function TemplateGallery({ onSelectTemplate, onCreateBlank }: TemplateGalleryProps) {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Create New Activity
        </h2>
        <p className="text-muted-foreground">
          Choose a template or start from scratch
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Blank Canvas */}
        <Card 
          className="group cursor-pointer border-2 border-dashed border-border hover:border-primary/50 transition-all duration-300 hover:shadow-soft"
          onClick={onCreateBlank}
        >
          <div className="p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Blank Canvas</h3>
            <p className="text-sm text-muted-foreground">Start from scratch</p>
          </div>
        </Card>

        {/* Templates */}
        {activityTemplates.map((template) => (
          <Card 
            key={template.id}
            className="group cursor-pointer hover:shadow-medium transition-all duration-300 overflow-hidden"
            onClick={() => onSelectTemplate(template)}
          >
            <div className="p-6 flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${typeColors[template.type]} flex items-center justify-center mb-4 text-primary-foreground shadow-soft group-hover:scale-105 transition-transform`}>
                {typeIcons[template.type]}
              </div>
              <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
