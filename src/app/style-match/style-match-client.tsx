"use client";

import { useState } from 'react';
import Image from 'next/image';
import {
  getStyleMatchingRecommendations,
  type StyleMatchingRecommendationsOutput,
} from '@/ai/flows/style-matching-recommendations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, UploadCloud, X, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function StyleMatchClient() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [recommendations, setRecommendations] = useState<StyleMatchingRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          title: "Файл слишком большой",
          description: "Пожалуйста, выберите изображение размером до 4 МБ.",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setRecommendations(null);
      setError(null);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setFile(null);
    setRecommendations(null);
  };

  const handleSubmit = async () => {
    if (!file || !preview) return;

    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result = await getStyleMatchingRecommendations({ photoDataUri: preview });
      setRecommendations(result);
    } catch (err) {
      console.error(err);
      setError('Не удалось получить рекомендации. Попробуйте другое изображение или повторите попытку позже.');
      toast({
        title: "Произошла ошибка",
        description: "Не удалось получить рекомендации. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-center">Загрузите фото вашей комнаты</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          {!preview && (
            <div className="flex items-center justify-center w-full">
              <Label
                htmlFor="picture"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Нажмите для загрузки</span> или перетащите</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (до 4МБ)</p>
                </div>
                <Input id="picture" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
              </Label>
            </div>
          )}

          {preview && (
            <div className="relative w-full max-w-lg mx-auto">
              <Image src={preview} alt="Предпросмотр" width={600} height={400} className="rounded-lg object-contain w-full h-auto" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 rounded-full h-8 w-8"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-center">
            <Button onClick={handleSubmit} disabled={!file || loading} size="lg" className="w-full max-w-xs">
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Анализ...
                </>
            ) : (
                'Получить рекомендации'
            )}
            </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Ошибка</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {recommendations && recommendations.recommendations.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="font-headline text-2xl text-center">Наши рекомендации</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.recommendations.map((rec, index) => (
                <Card key={index} className="bg-secondary/50">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <Lightbulb className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="font-body text-lg font-semibold">{rec.furnitureType}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{rec.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
