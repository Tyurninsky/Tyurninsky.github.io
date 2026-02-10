"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов." }),
  email: z.string().email({ message: "Пожалуйста, введите корректный email." }),
  message: z.string().min(10, { message: "Сообщение должно содержать не менее 10 символов." }),
});

export type ContactFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  success: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: "Ошибка валидации. Пожалуйста, проверьте введенные данные.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  
  // Здесь могла бы быть логика отправки email, сохранения в базу данных и т.д.
  // Для примера мы просто имитируем успешную отправку.
  console.log("Получено новое сообщение:");
  console.log(validatedFields.data);

  return {
    message: "Спасибо за ваше сообщение! Мы скоро с вами свяжемся.",
    success: true,
  };
}
