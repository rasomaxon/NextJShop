"use client"; 
// Указывает Next.js, что компонент должен рендериться на клиентской стороне (иначе хуки, такие как useState/useEffect, работать не будут).
import { useEffect, useState } from "react";
// Импорт хуков React: useState — для хранения данных, useEffect — для запроса данных при загрузке страницы.

import ProductCard from "@/components/ProductCard"; 
// Импорт компонента карточки товара. Каждому товару будет соответствовать одна такая карточка.
// Типизация объекта товара
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};
export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  // Создаем состояние products, в котором будем хранить список товаров, полученных с API

  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products"); 
    // Отправляем GET-запрос к API fakeStore
    const data = await res.json(); 
    // Получаем ответ и преобразуем его в JSON
    setProducts(data); 
    // Сохраняем полученные товары в состояние
  };

  useEffect(() => {
    fetchProducts(); 
    // useEffect с пустым массивом зависимостей [] — срабатывает один раз при монтировании компонента
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
        // Перебираем массив товаров и для каждого создаём компонент карточки, передавая товар через пропс
      ))}
    </div>
  );
}
