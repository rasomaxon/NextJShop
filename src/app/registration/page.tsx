"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Схема регистрации
const registerSchema = z
  .object({
    username: z.string().min(1, "Введите имя пользователя"),
    email: z.string().email("Введите корректный email"),
    phone: z.string().min(11, "Введите телефон"),
    password: z.string().min(6, "Минимум 6 символов"),
    confirmPassword: z.string().min(6, "Подтвердите пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password,
          name: {
            firstname: "Имя", // FakeStore требует вложенные поля
            lastname: "Фамилия",
          },
          address: {
            city: "Город",
            street: "Улица",
            number: 1,
            zipcode: "00000",
            geolocation: { lat: "0", long: "0" },
          },
          phone: data.phone,
        }),
      });

      if (res.ok) {
        alert("Регистрация прошла успешно!");
        router.push("/login");
      } else {
        alert("Ошибка регистрации");
      }
    } catch {
      alert("Ошибка сети");
    }
  };

  return (
    <main className="grid grid-cols-1 xl:grid-cols-2 h-screen">
      <div className="hidden xl:flex justify-center items-center" style={{ background: "#1f7d63" }}>
        <Link href="\" className='btn'>
					<Image src={"/images/logo_white.png"} alt={`logo`} width={340} height={395} />
				</Link>
			</div>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="loginContainer">
          <h1 className="text-5xl font-bold text-center">Регистрация</h1>

          <input type="text" placeholder="Имя пользователя*" {...register("username")} className="field text-2xl" />
          {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}

          <input type="email" placeholder="Email*" {...register("email")} className="field text-2xl" />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          <input type="tel" placeholder="Телефон*" {...register("phone")} className="field text-2xl" />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}

          <input type="password" placeholder="Пароль*" {...register("password")} className="field text-2xl" />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

          <input type="password" placeholder="Повторите пароль*" {...register("confirmPassword")} className="field text-2xl" />
          {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}

          <button type="submit" className="field btn greenBtn text-2xl">Продолжить</button>

          <p className="flex" style={{ gap: 15 }}>
            У меня уже есть аккаунт
            <Link href="/login" className="ref btn">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
