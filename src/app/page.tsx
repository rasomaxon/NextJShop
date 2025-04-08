"use client"; // Указывает, что компонент будет рендериться на клиенте

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice"; // Экшен для добавления товара в корзину
import { RootState } from "@/store"; // Типизация состояния Redux
import ProductCard from "@/components/ProductCard"; // Импорт компонента карточки товара
import Link from "next/link";
import Image from "next/image";
import Header from '@/components/Header';

// Типизация объекта товара
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
	category: string;
  image: string;
};

export default function HomePage() {
	// Новое состояние
	const [searchTerm, setSearchTerm] = useState(""); 
  // Состояние списка товаров
  const [products, setProducts] = useState<Product[]>([]);
  // Состояние сортировки: по возрастанию или убыванию
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // Получаем текущие товары в корзине из Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);

	const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Диспатч для вызова экшенов Redux
  const dispatch = useDispatch();

  // Функция для получения товаров с API
  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data); // Обновляем состояние
  };

  // Загружаем товары один раз при монтировании компонента
  useEffect(() => {fetchProducts();}, []);
	const filteredAndSortedProducts = [...products].filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  // Обработчик добавления товара в корзину
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <main className="flex flex-col items-center my-10">
			<Header></Header>
			
      <div className="mainContent">
				<div className="mainContentFunctions">
					<h1>
						{searchTerm.trim()
							? `Поиск по запросу: "${searchTerm.trim()}"`
							: "Все товары"}
					</h1>


					<div className="customSelectWrapper">
						<select
							value={sortOrder}
							onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
							className="sortSelect btn"
						>
							<option value="asc">По возрастанию цены</option>
							<option value="desc">По убыванию цены</option>
						</select>
						<span className="customArrow" />
					</div>
				</div>

        <div className="itemCardsContainer">
          {filteredAndSortedProducts.map((product) => (
            <div key={product.id}>
              {/* Отображаем карточку товара */}
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>

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
