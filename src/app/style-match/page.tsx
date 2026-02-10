import { StyleMatchClient } from "./style-match-client";

export default function StyleMatchPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">AI-подбор мебели</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Не уверены, какой стиль подойдет вашему интерьеру? Загрузите фото комнаты, и наш искусственный интеллект подберет идеальные варианты мебели ручной работы.
          </p>
        </div>
        <div className="mt-12">
            <StyleMatchClient />
        </div>
      </div>
    </div>
  );
}
