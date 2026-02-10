"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ShareButtonProps = {
  productName: string;
};

export function ShareButton({ productName }: ShareButtonProps) {
  const { toast } = useToast();
  const pathname = usePathname();
  const [url, setUrl] = useState('');
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after hydration
    setUrl(window.location.origin + pathname);
    if (navigator.share) {
      setCanShare(true);
    }
  }, [pathname]);

  const handleShare = async () => {
    if (!url) return;
    
    const shareData = {
      title: `Artisan Furnishings - ${productName}`,
      text: `Посмотрите этот товар: ${productName}`,
      url: url,
    };

    if (canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // AbortError is thrown when the user cancels the share dialog
        if ((err as Error).name !== 'AbortError') {
          console.error('Ошибка при использовании Web Share API:', err);
          copyToClipboard(); // Fallback to copy
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: 'Ссылка скопирована!',
        description: 'Вы можете поделиться ссылкой на этот товар.',
      });
    }).catch(err => {
      console.error('Не удалось скопировать ссылку:', err);
      toast({
        title: 'Ошибка',
        description: 'Не удалось скопировать ссылку.',
        variant: 'destructive',
      });
    });
  };

  // Render a disabled button during SSR and before the URL is available on the client
  if (!url) {
    return (
        <Button variant="outline" size="lg" disabled>
            <Share2 className="mr-2" />
            Поделиться
        </Button>
    );
  }

  const ShareIcon = canShare ? Share2 : Copy;

  return (
    <Button onClick={handleShare} variant="outline" size="lg">
      <ShareIcon className="mr-2" />
      Поделиться
    </Button>
  );
}
