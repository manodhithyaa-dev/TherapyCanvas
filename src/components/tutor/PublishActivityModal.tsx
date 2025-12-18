import { useState } from 'react';
import { Activity, PricingModel } from '@/types/therapy';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PublishActivityModalProps {
  activity: Activity;
  open: boolean;
  onClose: () => void;
  onPublish: (publishedActivity: any) => void;
}

export function PublishActivityModal({ activity, open, onClose, onPublish }: PublishActivityModalProps) {
  const [pricingModel, setPricingModel] = useState<PricingModel>('free');
  const [price, setPrice] = useState('0');
  const [description, setDescription] = useState(activity.description);
  const [ageMin, setAgeMin] = useState('3');
  const [ageMax, setAgeMax] = useState('8');
  const [therapyGoals, setTherapyGoals] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState('');

  const availableGoals = [
    'communication',
    'cognitive',
    'emotional-regulation',
    'independence',
    'routine',
    'vocabulary',
    'motor-skills',
    'social-skills',
  ];

  const handleAddGoal = () => {
    if (selectedGoal && !therapyGoals.includes(selectedGoal)) {
      setTherapyGoals([...therapyGoals, selectedGoal]);
      setSelectedGoal('');
    }
  };

  const handleRemoveGoal = (goal: string) => {
    setTherapyGoals(therapyGoals.filter(g => g !== goal));
  };

  const handlePublish = () => {
    if (pricingModel === 'paid' && (!price || parseFloat(price) <= 0)) {
      toast({
        title: 'Invalid Price',
        description: 'Please enter a valid price for paid activities',
        variant: 'destructive',
      });
      return;
    }

    const publishedActivity = {
      ...activity,
      description,
      price: pricingModel === 'free' ? 0 : parseFloat(price),
      pricingModel,
      ageRange: {
        min: parseInt(ageMin),
        max: parseInt(ageMax),
      },
      therapyGoals,
      purchaseCount: 0,
      rating: 0,
      reviewCount: 0,
      isPublished: true,
    };

    onPublish(publishedActivity);
    toast({
      title: 'Activity Published!',
      description: 'Your activity is now available in the marketplace',
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Publish Activity to Marketplace</DialogTitle>
          <DialogDescription>
            Make your activity available for other therapists and families to discover and purchase
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Activity Info */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">{activity.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline">{activity.type}</Badge>
              <Badge variant="outline">{activity.language}</Badge>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your activity..."
              rows={4}
            />
          </div>

          {/* Pricing Model */}
          <div className="space-y-3">
            <Label>Pricing Model</Label>
            <RadioGroup value={pricingModel} onValueChange={(value) => setPricingModel(value as PricingModel)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free" id="free" />
                <Label htmlFor="free" className="font-normal cursor-pointer">
                  Free - Share with the community
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paid" id="paid" />
                <Label htmlFor="paid" className="font-normal cursor-pointer">
                  Paid - Monetize your content
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Price */}
          {pricingModel === 'paid' && (
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price in INR"
              />
            </div>
          )}

          {/* Age Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ageMin">Minimum Age</Label>
              <Input
                id="ageMin"
                type="number"
                min="0"
                max="18"
                value={ageMin}
                onChange={(e) => setAgeMin(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ageMax">Maximum Age</Label>
              <Input
                id="ageMax"
                type="number"
                min="0"
                max="18"
                value={ageMax}
                onChange={(e) => setAgeMax(e.target.value)}
              />
            </div>
          </div>

          {/* Therapy Goals */}
          <div className="space-y-2">
            <Label>Therapy Goals</Label>
            <div className="flex gap-2">
              <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a goal" />
                </SelectTrigger>
                <SelectContent>
                  {availableGoals
                    .filter(goal => !therapyGoals.includes(goal))
                    .map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal.replace('-', ' ')}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={handleAddGoal} variant="outline">
                Add
              </Button>
            </div>
            {therapyGoals.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {therapyGoals.map((goal) => (
                  <Badge key={goal} variant="secondary" className="flex items-center gap-1">
                    {goal.replace('-', ' ')}
                    <button
                      onClick={() => handleRemoveGoal(goal)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handlePublish}>
            Publish to Marketplace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

