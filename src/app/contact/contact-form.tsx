"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/actions";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Отправка..." : "Отправить сообщение"}
    </Button>
  );
}

export function ContactForm() {
  const initialState = { message: "", success: false, errors: {} };
  const [state, dispatch] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Успешно!",
          description: state.message,
        });
      } else if(state.errors) {
        toast({
          title: "Ошибка",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  return (
    <form action={dispatch} className="space-y-4">
      <div>
        <Label htmlFor="name">Ваше имя</Label>
        <Input id="name" name="name" type="text" placeholder="Иван" required />
        {state.errors?.name && <p className="text-destructive text-sm mt-1">{state.errors.name[0]}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="ivan@example.com" required />
        {state.errors?.email && <p className="text-destructive text-sm mt-1">{state.errors.email[0]}</p>}
      </div>
      <div>
        <Label htmlFor="message">Сообщение</Label>
        <Textarea id="message" name="message" placeholder="Расскажите о вашем проекте..." required minLength={10} />
        {state.errors?.message && <p className="text-destructive text-sm mt-1">{state.errors.message[0]}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}
