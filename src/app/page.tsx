import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Leaf, Star } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { products } from '@/lib/products';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
            Artisan Furnishings
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow">
            Эксклюзивная мебель ручной работы, созданная с душой и мастерством.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/catalog">
              Смотреть каталог <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold">Почему выбирают нас</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              Мы вкладываем 15-летний опыт в каждое изделие, чтобы оно радовало вас десятилетиями.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <Star className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-headline text-xl font-medium mb-2">Ручная работа</h3>
              <p className="text-muted-foreground">Каждая деталь создается вручную с особым вниманием, что гарантирует уникальность и высочайшее качество.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <Leaf className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-headline text-xl font-medium mb-2">Натуральные материалы</h3>
              <p className="text-muted-foreground">Мы используем только лучшие породы дерева и экологичные покрытия, безопасные для вашего дома и семьи.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <CheckCircle className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-headline text-xl font-medium mb-2">Долговечность</h3>
              <p className="text-muted-foreground">Наша мебель — это инвестиция в будущее. Она создана, чтобы служить верой и правдой многим поколениям.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold">Избранные работы</h2>
            <p className="mt-2 text-lg text-muted-foreground">Взгляните на то, что мы можем создать для вас.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const productImage = PlaceHolderImages.find(p => p.id === product.imageId);
              return (
                <Card key={product.id} className="overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {productImage && (
                        <Image
                          src={productImage.imageUrl}
                          alt={product.name}
                          data-ai-hint={productImage.imageHint}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-headline text-xl font-semibold">{product.name}</h3>
                      <p className="text-muted-foreground mt-2">{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(product.price)}</p>
                      <Button asChild variant="link" className="p-0 mt-4 text-primary">
                        <Link href={`/catalog/${product.category}/${product.id}`}>
                          Подробнее <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/catalog">Перейти в полный каталог</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
