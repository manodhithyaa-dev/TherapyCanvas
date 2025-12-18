import { useState } from 'react';
import { indianAssets } from '@/data/assets';
import { Asset, AssetCategory } from '@/types/therapy';
import { useApp } from '@/contexts/AppContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

const categories: { id: AssetCategory; label: string; emoji: string }[] = [
  { id: 'food', label: 'Food', emoji: '🍽️' },
  { id: 'clothing', label: 'Clothing', emoji: '👕' },
  { id: 'routines', label: 'Routines', emoji: '⏰' },
  { id: 'emotions', label: 'Emotions', emoji: '😊' },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧' },
  { id: 'places', label: 'Places', emoji: '🏠' },
  { id: 'transport', label: 'Transport', emoji: '🚗' },
  { id: 'nature', label: 'Nature', emoji: '🌳' },
  { id: 'objects', label: 'Objects', emoji: '📦' },
];

interface AssetLibraryProps {
  onSelectAsset: (asset: Asset) => void;
}

export function AssetLibrary({ onSelectAsset }: AssetLibraryProps) {
  const { currentLanguage } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | 'all'>('all');

  const filteredAssets = indianAssets.filter((asset) => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.nameHindi?.includes(searchQuery) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-display font-semibold text-foreground mb-3">Asset Library</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-2 border-b border-border">
        <div className="flex flex-wrap gap-1">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className="text-xs"
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="text-xs"
            >
              {cat.emoji}
            </Button>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      <ScrollArea className="flex-1">
        <div className="p-3 grid grid-cols-3 gap-2">
          {filteredAssets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => onSelectAsset(asset)}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('asset', JSON.stringify(asset));
              }}
              className="group flex flex-col items-center p-3 rounded-xl hover:bg-muted transition-colors cursor-grab active:cursor-grabbing"
            >
              <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                {asset.imageUrl}
              </span>
              <span className="text-xs text-center text-muted-foreground line-clamp-1">
                {currentLanguage === 'hindi' && asset.nameHindi ? asset.nameHindi : asset.name}
              </span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
