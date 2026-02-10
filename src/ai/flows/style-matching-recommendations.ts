'use server';

/**
 * @fileOverview Предоставляет рекомендации по стилю мебели на основе загруженного пользователем изображения их комнаты.
 *
 * - `getStyleMatchingRecommendations` - Функция, которая принимает изображение комнаты и возвращает рекомендации по мебели.
 * - `StyleMatchingRecommendationsInput` - Тип входных данных для функции `getStyleMatchingRecommendations`.
 * - `StyleMatchingRecommendationsOutput` - Тип возвращаемых данных для функции `getStyleMatchingRecommendations`.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleMatchingRecommendationsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "Фотография интерьера комнаты в формате URI данных, который должен включать MIME-тип и использовать кодировку Base64. Ожидаемый формат: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type StyleMatchingRecommendationsInput = z.infer<typeof StyleMatchingRecommendationsInputSchema>;

const StyleMatchingRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      furnitureType: z.string().describe('Тип рекомендуемой мебели (например, диван, стул, стол).'),
      description: z.string().describe('Описание рекомендуемого стиля мебели и почему он подходит к комнате.'),
    })
  ).describe('Список рекомендаций по мебели.'),
});
export type StyleMatchingRecommendationsOutput = z.infer<typeof StyleMatchingRecommendationsOutputSchema>;

export async function getStyleMatchingRecommendations(input: StyleMatchingRecommendationsInput): Promise<StyleMatchingRecommendationsOutput> {
  return styleMatchingRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleMatchingRecommendationsPrompt',
  input: {schema: StyleMatchingRecommendationsInputSchema},
  output: {schema: StyleMatchingRecommendationsOutputSchema},
  prompt: `Вы — ассистент по дизайну интерьеров. Пользователь загрузит фотографию своей комнаты, а вы должны предоставить рекомендации по мебели, соответствующей стилю комнаты. Проанализируйте фотографию на предмет цветовой палитры, дизайнерских паттернов, пространственных размеров и существующей мебели.

  Основываясь на вашем анализе, порекомендуйте конкретные типы мебели (например, диван, стулья, столы), которые дополнят существующий декор комнаты. Предоставьте описание каждой рекомендации, объясняя, почему она соответствует стилю комнаты. Ответ должен быть на русском языке.

  Фото: {{media url=photoDataUri}}
  `,
});

const styleMatchingRecommendationsFlow = ai.defineFlow(
  {
    name: 'styleMatchingRecommendationsFlow',
    inputSchema: StyleMatchingRecommendationsInputSchema,
    outputSchema: StyleMatchingRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
