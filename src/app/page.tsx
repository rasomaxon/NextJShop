"use client"; // Указывает, что компонент будет рендериться на клиенте

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice"; // Экшен для добавления товара в корзину
import { RootState } from "@/store"; // Типизация состояния Redux
import ProductCard from "@/components/ProductCard"; // Импорт компонента карточки товара
import Link from "next/link";
import Image from "next/image";

// Типизация объекта товара
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

export default function HomePage() {
  // Состояние списка товаров
  const [products, setProducts] = useState<Product[]>([]);

  // Состояние сортировки: по возрастанию или убыванию
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Получаем текущие товары в корзине из Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Диспатч для вызова экшенов Redux
  const dispatch = useDispatch();

  // Функция для получения товаров с API
  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data); // Обновляем состояние
  };

  // Загружаем товары один раз при монтировании компонента
  useEffect(() => {
    fetchProducts();
  }, []);

  // Сортируем товары по цене в зависимости от выбранного порядка
  const sortedProducts = [...products].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  // Обработчик добавления товара в корзину
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <main className="flex flex-col items-center my-10">
      <header>
        <Image
          className="logo"
          src="/images/logo_long.png"
          width={143}
          height={50}
          alt=""
        />
				        <button
          onClick={() => {}}
          className="greenBtn"
          style={{ width: 128, height: 50 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H15M3 6H21M3 18H21"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p style={{ fontSize: 20 }}>каталог</p>
        </button>
        <div className="search">
          <input type="search" />
          <button className="searchBtn" style={{ width: 50, height: 50 }}>
            <svg
              width="26"
              height="25"
              viewBox="0 0 26 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.111 17.7083C15.5627 17.7083 18.361 14.9101 18.361 11.4583C18.361 8.00655 15.5627 5.20833 12.111 5.20833C8.65918 5.20833 5.86096 8.00655 5.86096 11.4583C5.86096 14.9101 8.65918 17.7083 12.111 17.7083Z"
                stroke="white"
                stroke-width="2"
              />
              <path
                d="M16.7985 16.1458L21.486 20.8333"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="mainContent">
        {/* Кнопка для переключения сортировки */}
        <div className="mb-4">
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-4 py-2 border bg-blue-600 text-white rounded"
          >
            Сортировать по цене (
            {sortOrder === "asc" ? "По возрастанию" : "По убыванию"})
          </button>
        </div>

        {/* Сетка товаров */}
        <div className="itemCardsContainer">
          {sortedProducts.map((product) => (
            <div key={product.id}>
              {/* Отображаем карточку товара */}
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>

        {/* Блок корзины */}
        <div className="mt-4 w-full max-w-2xl">
          <h2 className="text-xl font-semibold">Корзина</h2>
          <ul className="list-disc pl-5">
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
