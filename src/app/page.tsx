"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "@/store/slices/cartSlice";
import { RootState } from "@/store";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filteredAndSortedProducts = [...products]
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleIncrease = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <main className="flex flex-col items-center my-10">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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
              onChange={(e) =>
                setSortOrder(e.target.value as "asc" | "desc")
              }
              className="sortSelect btn"
            >
              <option value="asc">По возрастанию цены</option>
              <option value="desc">По убыванию цены</option>
            </select>
            <span className="customArrow" />
          </div>
        </div>

        <div className="itemCardsContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredAndSortedProducts.map((product) => {
            const itemInCart = cartItems.find((item) => item.id === product.id);
            const quantityInCart = itemInCart ? itemInCart.quantity : 0;

            return (
              <ProductCard
                key={product.id}
                product={product}
                quantityInCart={quantityInCart}
                onAddToCart={handleAddToCart}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
