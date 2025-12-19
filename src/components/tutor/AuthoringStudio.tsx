import { useState } from 'react';
import { Template, CanvasElement, Asset, Activity } from '@/types/therapy';
import { useApp } from '@/contexts/AppContext';
import { Header } from '@/components/Header';
import { TemplateGallery } from './TemplateGallery';
import { AssetLibrary } from './AssetLibrary';
import { CanvasEditor } from './CanvasEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Save, 
  Play, 
  Download, 
  Share2,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import { toast } from 'sonner';

type View = 'gallery' | 'editor';

export function AuthoringStudio() {
  const { activities, setActivities, setCurrentActivity, currentLanguage } = useApp();
  const [view, setView] = useState<View>('gallery');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [activityTitle, setActivityTitle] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setElements(template.elements || []);
    setActivityTitle(template.name);
    setView('editor');
  };

  const handleCreateBlank = () => {
    setSelectedTemplate(null);
    setElements([]);
    setActivityTitle('New Activity');
    setView('editor');
  };

  const handleAddAsset = (asset: Asset, x: number, y: number) => {
    const newElement: CanvasElement = {
      id: `asset-${Date.now()}`,
      type: 'image',
      x,
      y,
      width: 80,
      height: 80,
      content: asset.imageUrl,
      style: {
        backgroundColor: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 2,
        borderRadius: 12,
      },
    };
    setElements([...elements, newElement]);
  };

  const handleSave = () => {
    if (!activityTitle.trim()) {
      toast.error('Please enter an activity title');
      return;
    }

    const activity: Activity = {
      id: `activity-${Date.now()}`,
      title: activityTitle,
      type: selectedTemplate?.type || 'matching',
      language: currentLanguage,
      description: '',
      elements,
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: 'tutor-1',
      isPublished: false,
      tags: [],
    };

    setActivities([...activities, activity]);
    setShowSaveDialog(false);
    toast.success('Activity saved!');
  };

  const handlePreview = () => {
    if (elements.length === 0) {
      toast.error('Add some elements to preview');
      return;
    }
    
    const activity: Activity = {
      id: 'preview',
      title: activityTitle,
      type: selectedTemplate?.type || 'matching',
      language: currentLanguage,
      description: '',
      elements,
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: 'tutor-1',
      isPublished: false,
      tags: [],
    };
    
    setCurrentActivity(activity);
    toast.info('Preview mode - interact with your activity!');
  };

  if (view === 'gallery') {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Authoring Studio" />
        <TemplateGallery 
          onSelectTemplate={handleSelectTemplate}
          onCreateBlank={handleCreateBlank}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        title={activityTitle} 
        showBack 
        onBack={() => setView('gallery')}
      />
      
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon-sm"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </Button>
          <Input
            value={activityTitle}
            onChange={(e) => setActivityTitle(e.target.value)}
            className="w-64 h-8 font-semibold"
            placeholder="Activity title..."
          />
        </div>
        
        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="sm" onClick={handlePreview}>
            <Play className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button> */}
          {/* <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button> */}
          <Button variant="default" size="sm" onClick={() => setShowSaveDialog(true)}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex overflow-hidden">
        {showSidebar && (
          <div className="w-64 flex-shrink-0">
            <AssetLibrary onSelectAsset={(asset) => handleAddAsset(asset, 200, 200)} />
          </div>
        )}
        <div className="flex-1">
          <CanvasEditor 
            elements={elements}
            onElementsChange={setElements}
            onAddAsset={handleAddAsset}
          />
        </div>
      </div>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Activity</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              Activity Title
            </label>
            <Input
              value={activityTitle}
              onChange={(e) => setActivityTitle(e.target.value)}
              placeholder="Enter activity title..."
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Activity
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
