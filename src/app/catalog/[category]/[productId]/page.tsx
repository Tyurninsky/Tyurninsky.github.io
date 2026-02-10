import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';
import { ShareButton } from '@/components/share-button';

type ProductPageProps = {
  params: {
    productId: string;
  };
};

export async function generateStaticParams() {
    return products.map((product) => ({
        productId: product.id,
        category: product.category,
    }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.productId);

  if (!product) {
    notFound();
  }

  const productImage = PlaceHolderImages.find((p) => p.id === product.imageId);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square md:aspect-auto rounded-lg overflow-hidden shadow-lg">
          {productImage && (
            <Image
              src={productImage.imageUrl}
              alt={product.name}
              data-ai-hint={productImage.imageHint}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <Badge variant="secondary" className="w-fit">{product.category === 'chairs' ? 'Стулья' : product.category === 'tables' ? 'Столы' : 'Шкафы'}</Badge>
          <h1 className="font-headline text-3xl md:text-4xl font-bold mt-2">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-primary">
            {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(product.price)}
          </p>
          <Separator className="my-6" />
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">
                <MessageCircle className="mr-2" /> Заказать
              </Link>
            </Button>
            <ShareButton productName={product.name} />
            <Button asChild size="lg" variant="outline">
              <Link href="/catalog">
                 Продолжить просмотр
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
