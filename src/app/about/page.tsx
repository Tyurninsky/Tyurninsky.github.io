import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Hammer, Users } from 'lucide-react';

export default function AboutPage() {
  const craftsmanImage = PlaceHolderImages.find(p => p.id === 'craftsman-nikolai');

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">О Мастере</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Знакомьтесь с человеком, который вкладывает душу в каждое изделие — Николай Тюрнин.
        </p>
      </div>

      <Card className="mt-12 overflow-hidden shadow-lg">
        <div className="grid md:grid-cols-5">
          <div className="md:col-span-2 relative min-h-[300px] md:min-h-0">
            {craftsmanImage && (
              <Image
                src={craftsmanImage.imageUrl}
                alt={`Портрет мастера ${craftsmanImage.description}`}
                data-ai-hint={craftsmanImage.imageHint}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="md:col-span-3">
            <CardContent className="p-8 md:p-12">
              <h2 className="font-headline text-3xl font-semibold text-primary">Николай Тюрнин</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                За 15 лет работы с деревом я прошел путь от простого увлечения до дела всей жизни. Для меня мебель — это не просто предметы интерьера, а живая история, которая будет передаваться из поколения в поколение.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Каждый заказ для меня — это новая история. Я внимательно слушаю пожелания клиента, чтобы создать не просто красивую вещь, а функциональное и гармоничное дополнение для вашего дома. Моя цель — превосходить ожидания и создавать мебель, которая будет радовать вас долгие годы.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="p-4 rounded-lg">
                  <Hammer className="mx-auto w-10 h-10 text-accent mb-2" />
                  <p className="font-bold text-lg">15 лет</p>
                  <p className="text-sm text-muted-foreground">Опыта работы</p>
                </div>
                <div className="p-4 rounded-lg">
                  <Award className="mx-auto w-10 h-10 text-accent mb-2" />
                  <p className="font-bold text-lg">Ручная работа</p>
                  <p className="text-sm text-muted-foreground">Эксклюзивность</p>
                </div>
                <div className="p-4 rounded-lg">
                  <Users className="mx-auto w-10 h-10 text-accent mb-2" />
                  <p className="font-bold text-lg">Индивидуальный</p>
                  <p className="text-sm text-muted-foreground">Подход</p>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
