import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Download, ShoppingCart } from 'lucide-react';
import { MarketplaceActivity, User } from '@/types/therapy';
import { purchaseApi } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

interface PurchaseButtonProps {
  activity: MarketplaceActivity;
  user: User | null;
  isPurchased: boolean;
  purchaseActivity: (activityId: string, price: number) => boolean;
}

export function PurchaseButton({ activity, user, isPurchased: localPurchased, purchaseActivity }: PurchaseButtonProps) {
  const [purchased, setPurchased] = useState(localPurchased);
  const [checking, setChecking] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    setPurchased(localPurchased);
  }, [localPurchased]);

  useEffect(() => {
    // Check backend for purchase status
    if (user?.id && !purchased) {
      setChecking(true);
      purchaseApi.checkPurchase(user.id, activity.id)
        .then(res => {
          setPurchased(res.purchased);
        })
        .catch(() => {
          // Ignore errors, use local state
        })
        .finally(() => {
          setChecking(false);
        });
    }
  }, [user?.id, activity.id, purchased]);

  const handlePurchase = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (purchased) {
      toast({
        title: 'Already Purchased',
        description: 'You already own this activity',
      });
      return;
    }

    const isFree = activity.pricingModel === 'free';

    if (isFree) {
      // Free download
      purchaseActivity(activity.id, 0);
      setPurchased(true);
      toast({
        title: 'Downloaded!',
        description: 'Activity added to your library',
      });
    } else {
      // Paid purchase
      if (!user) {
        toast({
          title: 'Sign In Required',
          description: 'Please sign in to purchase activities',
          variant: 'destructive',
        });
        return;
      }

      try {
        setPurchasing(true);
        await purchaseApi.createPurchase(user.id, activity.id);
        purchaseActivity(activity.id, activity.price);
        setPurchased(true);
        toast({
          title: 'Purchase Successful!',
          description: `You've purchased "${activity.title}" for ₹${activity.price}`,
        });
      } catch (err: any) {
        toast({
          title: 'Purchase Failed',
          description: err.message || 'Failed to complete purchase',
          variant: 'destructive',
        });
      } finally {
        setPurchasing(false);
      }
    }
  };

  const isFree = activity.pricingModel === 'free';

  return (
    <Button
      className="w-full"
      variant={purchased ? 'outline' : (isFree ? 'default' : 'tutor')}
      onClick={handlePurchase}
      disabled={purchased || purchasing || checking}
    >
      {purchased ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Purchased
        </>
      ) : purchasing ? (
        <>
          <ShoppingCart className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : isFree ? (
        <>
          <Download className="w-4 h-4 mr-2" />
          Download Free
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Buy ₹{activity.price}
        </>
      )}
    </Button>
  );
}

