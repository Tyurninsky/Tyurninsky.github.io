import Link from "next/link";
import { ContactForm } from "./contact-form";
import { Button } from "@/components/ui/button";

const TelegramIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.84c.15 0 .28.06.38.16.1.1.16.23.16.38l-.01 7.27c0 .15-.06.28-.16.38-.1.1-.23.16-.38.16-.35 0-1.42-.44-1.95-.74l-2.62-1.9c-.1-.07-.16-.17-.16-.29v-1.98c0-.02 0-.03.01-.05l4.5-4.04c.09-.08.23-.08.32 0z" opacity=".5"/><path d="M12.01 15.25c-.24 0-.47-.09-.65-.25l-2.8-2.31c-.1-.08-.15-.2-.15-.33L12.92 8.4c.09-.1.25-.11.36-.02.1.09.11.25.02.36l-3.3 3.63.84.69 4.3 2.53c.1.06.15.16.15.28 0 .15-.06.28-.16.38-.1.1-.23.16-.38.16h-.69z"/>
    </svg>
);

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Свяжитесь с нами</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Готовы обсудить ваш будущий проект или задать вопрос? Заполните форму ниже или напишите нам в Telegram.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-card p-8 rounded-lg shadow-sm border">
            <h2 className="font-headline text-2xl font-semibold mb-6">Форма для связи</h2>
            <ContactForm />
          </div>
          <div className="flex flex-col items-center justify-center text-center bg-card p-8 rounded-lg shadow-sm border">
            <h2 className="font-headline text-2xl font-semibold mb-4">Быстрый заказ</h2>
            <p className="text-muted-foreground mb-6">
              Для индивидуального заказа и быстрого ответа, напишите мастеру напрямую в Telegram.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="https://t.me/tyurnin" target="_blank" rel="noopener noreferrer">
                <TelegramIcon />
                <span className="ml-2">Написать в Telegram</span>
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Или по никнейму <span className="font-mono text-primary">@tyurnin</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
