"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';

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
    <main className="grid grid-cols-1 xl:grid-cols-2 h-screen">
			<div className="hidden xl:flex justify-center items-center" style={{ background: "#1f7d63" }}>
				<Link href="\" className='btn'>
					<Image
						src={"/images/logo_white.png"}
						alt={`logo`}
						width={340} height={395}/>
				</Link>
			</div>
			<div className='flex justify-center items-center'>
				<form onSubmit={handleSubmit(onSubmit)} className="loginContainer">
					<h1 className="text-5xl font-bold text-center">Войти в аккаунт</h1>
					<p className='text-2xl text-center' style={{color:"#958F90"}}>Войдите или создайте учетную запись, чтобы оформлять покупки!</p>
					<input
						type="text"
						placeholder="ivan@example.com"
						{...register("username")} 
						className="field text-2xl"
					/>
					{errors.username && (
						<span className="text-red-500 text-sm">{errors.username.message}</span>
					)}

					<input
						type="password"
						placeholder="Пароль"
						{...register("password")}
						className="field text-2xl"
					/>
					{errors.password && (
						<span className="text-red-500 text-sm">{errors.password.message}</span>
					)}

					<button type="submit" className="field btn greenBtn text-2xl">
						Продолжить
					</button>
					<button type="button" className="field btn text-2xl">
						<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
							<path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
						</svg>
						Продолжить через Google
					</button>
					<button type="button" className="field btn text-2xl">
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none">
							<path d="M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z" fill="#FC3F1D"/><path d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z" fill="#fff"/>
						</svg>
						Продолжить через Яндекс
					</button>
					<p className='flex' style={{gap: 15}}>
						Ещё нет аккаунта?
						<Link href="\registration" className='ref btn'>
							Создайте
						</Link>
					</p>
				</form>
			</div>
    </main>
  );
}
