import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Footer() {
  const TelegramIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.84c.15 0 .28.06.38.16.1.1.16.23.16.38l-.01 7.27c0 .15-.06.28-.16.38-.1.1-.23.16-.38.16-.35 0-1.42-.44-1.95-.74l-2.62-1.9c-.1-.07-.16-.17-.16-.29v-1.98c0-.02 0-.03.01-.05l4.5-4.04c.09-.08.23-.08.32 0z" opacity=".5"/><path d="M12.01 15.25c-.24 0-.47-.09-.65-.25l-2.8-2.31c-.1-.08-.15-.2-.15-.33L12.92 8.4c.09-.1.25-.11.36-.02.1.09.11.25.02.36l-3.3 3.63.84.69 4.3 2.53c.1.06.15.16.15.28 0 .15-.06.28-.16.38-.1.1-.23.16-.38.16h-.69z"/>
    </svg>
  );

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Artisan Furnishings. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
             <p className="text-sm text-muted-foreground">Связаться с мастером:</p>
            <Button asChild variant="ghost" size="icon">
              <Link href="https://t.me/tyurnin" target="_blank" rel="noopener noreferrer" aria-label="Связаться в Telegram">
                <TelegramIcon />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
