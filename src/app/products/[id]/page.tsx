"use client";
// Указывает, что компонент работает на клиенте — обязательно для использования хуков (useEffect, useState, useParams)

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Хук для получения параметров маршрута из адресной строки (в данном случае ID товара)

// Тип данных продукта
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

export default function ProductPage() {
  const { id } = useParams(); // Получаем параметр маршрута [id] из URL
  const [product, setProduct] = useState<Product | null>(null); // Состояние для хранения данных продукта

  // Асинхронная функция для получения информации о товаре с сервера
  const fetchProduct = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    setProduct(data); // Сохраняем полученные данные
  };

  // Вызываем fetch при первом рендере и при изменении id
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Пока продукт не загрузился — показываем заглушку
  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-48 h-48 object-cover mb-4"
      />
      <p>{product.description}</p>
      <p className="text-xl font-bold">{product.price} $</p>
      <button className="px-4 py-2 bg-green-600 text-white rounded mt-4">
        Добавить в корзину
      </button>
    </div>
  );
}
