import { useState, useCallback } from 'react';
import { Activity, CanvasElement } from '@/types/therapy';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  RotateCcw,
  Star,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface ActivityPlayerProps {
  activity: Activity;
  onComplete?: () => void;
  onBack?: () => void;
}

export function ActivityPlayer({ activity, onComplete, onBack }: ActivityPlayerProps) {
  const [elements, setElements] = useState(activity.elements);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [completedDrops, setCompletedDrops] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);

  const dropZones = elements.filter(el => el.isDropZone);
  const draggableItems = elements.filter(el => !el.isDropZone && el.type === 'image');
  const totalDropZones = dropZones.length;

  const handleDragStart = (e: React.DragEvent, elementId: string) => {
    setDraggedId(elementId);
    e.dataTransfer.setData('text/plain', elementId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropZone: CanvasElement) => {
    e.preventDefault();
    const draggedElementId = e.dataTransfer.getData('text/plain');
    
    if (!draggedElementId || completedDrops.has(dropZone.id)) return;

    // Move dragged element to drop zone position
    setElements(prev => 
      prev.map(el => {
        if (el.id === draggedElementId) {
          return {
            ...el,
            x: dropZone.x + (dropZone.width - el.width) / 2,
            y: dropZone.y + (dropZone.height - el.height) / 2,
          };
        }
        return el;
      })
    );

    setCompletedDrops(prev => new Set([...prev, dropZone.id]));
    setScore(prev => prev + 1);
    
    toast.success('Great job! ⭐', { duration: 1500 });

    // Check if all complete
    if (completedDrops.size + 1 >= totalDropZones && totalDropZones > 0) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        toast.success('Amazing! Activity Complete! 🎉', { duration: 3000 });
        onComplete?.();
      }, 500);
    }

    setDraggedId(null);
  };

  const handleReset = () => {
    setElements(activity.elements);
    setCompletedDrops(new Set());
    setScore(0);
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ChevronLeft className="w-6 h-6" />
              </Button>
            )}
            <div>
              <h1 className="font-display font-bold text-foreground text-lg">
                {activity.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span>{score} / {totalDropZones || draggableItems.length}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => speakText(activity.title)}>
              <Volume2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleReset}>
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Activity Canvas */}
      <div className="flex-1 overflow-auto p-4">
        <div 
          className="relative bg-card rounded-2xl shadow-medium mx-auto"
          style={{
            width: 800,
            height: 600,
            maxWidth: '100%',
          }}
        >
          {elements.map((element) => (
            <div
              key={element.id}
              className={`absolute transition-all duration-200 ${
                element.isDropZone 
                  ? 'border-dashed' 
                  : !completedDrops.has(element.id) && element.type === 'image'
                  ? 'cursor-grab active:cursor-grabbing hover:scale-105'
                  : ''
              } ${
                completedDrops.has(element.id) ? 'ring-2 ring-success' : ''
              }`}
              style={{
                left: element.x,
                top: element.y,
                width: element.width,
                height: element.height,
                backgroundColor: element.style?.backgroundColor,
                borderColor: completedDrops.has(element.id) 
                  ? 'hsl(var(--success))' 
                  : element.style?.borderColor,
                borderWidth: element.style?.borderWidth,
                borderRadius: element.style?.borderRadius,
                borderStyle: element.isDropZone ? 'dashed' : 'solid',
              }}
              draggable={!element.isDropZone && element.type === 'image'}
              onDragStart={(e) => handleDragStart(e, element.id)}
              onDragOver={element.isDropZone ? handleDragOver : undefined}
              onDrop={element.isDropZone ? (e) => handleDrop(e, element) : undefined}
            >
              {element.type === 'text' && (
                <div
                  className="w-full h-full flex items-center justify-center font-semibold"
                  style={{
                    fontSize: element.style?.fontSize,
                    color: element.style?.fontColor,
                  }}
                  onClick={() => speakText(element.content)}
                >
                  {element.content}
                </div>
              )}
              {element.type === 'image' && (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <span className="text-4xl">{element.content}</span>
                </div>
              )}
              {element.isDropZone && completedDrops.has(element.id) && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-success-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-card border-t border-border px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="outline" size="lg" className="rounded-full w-14 h-14">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <div className="flex gap-2">
            {[...Array(Math.min(5, totalDropZones || 3))].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i < score ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          <Button variant="outline" size="lg" className="rounded-full w-14 h-14">
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
