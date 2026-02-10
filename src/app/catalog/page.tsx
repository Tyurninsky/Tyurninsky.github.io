import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { categories } from '@/lib/products';
import { ArrowRight } from 'lucide-react';

export default function CatalogPage() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Каталог</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Ознакомьтесь с нашими работами. Каждое изделие может быть адаптировано под ваши размеры и пожелания.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => {
          const categoryImage = PlaceHolderImages.find((p) => p.id === category.imageId);
          return (
            <Link key={category.id} href={`/catalog/${category.id}`} className="group block">
              <Card className="h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <div className="relative aspect-video overflow-hidden">
                  {categoryImage && (
                    <Image
                      src={categoryImage.imageUrl}
                      alt={category.name}
                      data-ai-hint={categoryImage.imageHint}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <CardDescription>{category.description}</CardDescription>
                  <div className="mt-4 flex items-center text-primary font-medium">
                    Смотреть
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
