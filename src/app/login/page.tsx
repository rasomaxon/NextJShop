"use client";
// Делает компонент клиентским — нужен, т.к. используются хуки (useForm, useDispatch и др.)
import { useForm } from "react-hook-form";
// Основной хук для управления формой

import { z } from "zod";
// Zod — библиотека для описания и проверки схем данных (валидация)

import { zodResolver } from "@hookform/resolvers/zod";
// Подключает Zod к react-hook-form

import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
// Диспатчим токен и имя пользователя в Redux

import { useRouter } from "next/navigation";
// Хук для программной навигации между страницами
const loginSchema = z.object({
  username: z.string().min(1, "Введите имя пользователя"),
  password: z.string().min(1, "Введите пароль"),
});
// Описываем схему: оба поля обязательные

type LoginForm = z.infer<typeof loginSchema>;
// Автоматически создаем типы из схемы для формы
export default function LoginPage() {
  const {
    register, // для регистрации инпутов
    handleSubmit, // обертка для сабмита формы
    formState: { errors }, // объект ошибок
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema), // подключаем zod-схему
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.token) {
        dispatch(setCredentials({ token: result.token, user: data.username }));
        // Сохраняем токен и имя пользователя в Redux
        router.push("/"); // Переходим на главную после логина
      } else {
        alert("Ошибка авторизации");
      }
    } catch (err) {
      alert("Ошибка сети");
    }
  };
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit(onSubmit)} // обработка сабмита
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <h1 className="text-2xl font-bold text-center">Вход</h1>

        <input
          type="text"
          placeholder="Имя пользователя"
          {...register("username")} // подключаем к react-hook-form
          className="border p-2 rounded"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">{errors.username.message}</span>
        )}

        <input
          type="password"
          placeholder="Пароль"
          {...register("password")}
          className="border p-2 rounded"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Войти
        </button>
      </form>
    </main>
  );
}
