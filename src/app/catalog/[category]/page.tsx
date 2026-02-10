import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, categories } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.id,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.id === params.category);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.category === params.category);

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{category.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {category.description}
        </p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((product) => {
            const productImage = PlaceHolderImages.find((p) => p.id === product.imageId);
            return (
              <Card key={product.id} className="overflow-hidden group flex flex-col">
                <CardContent className="p-0 flex flex-col flex-grow">
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
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-headline text-xl font-semibold">{product.name}</h3>
                    <p className="text-muted-foreground mt-2 flex-grow">{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(product.price)}</p>
                    <Button asChild variant="link" className="p-0 mt-4 self-start text-primary">
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
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">В этой категории пока нет товаров.</p>
          <Button asChild className="mt-6">
            <Link href="/catalog">Вернуться в каталог</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
