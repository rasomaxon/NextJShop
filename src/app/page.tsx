"use client";
import './globals.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "@/store/slices/cartSlice";
import { RootState } from "@/store";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

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
	const [loading, setLoading] = useState(true);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
	
  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
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
					<h1 className="text-2xl font-bold mb-4" style={{color:"#1f7d63"}}>
						{searchTerm.trim()
							? `Найдено ${filteredAndSortedProducts.length} товаров по запросу: "${searchTerm.trim()}"`
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
					{loading
						? Array.from({ length: 18 }).map((_, idx) => <ProductCardSkeleton key={idx} />)
						: filteredAndSortedProducts.map((product) => {
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


				<div className='ourAdvantages'>
					<h1 className="text-2xl font-bold mb-4"  style={{color:"#1f7d63"}}>Наши плюсы</h1>
					<div className='flex justify-around'>
						<div className='AdvantageCard'>
							<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M37.5 4.16669H12.5C10.1988 4.16669 8.33334 6.03217 8.33334 8.33335V41.6667C8.33334 43.9679 10.1988 45.8334 12.5 45.8334H37.5C39.8012 45.8334 41.6667 43.9679 41.6667 41.6667V8.33335C41.6667 6.03217 39.8012 4.16669 37.5 4.16669Z" stroke="#1F7D63" stroke-width="1.33333"/>
								<path d="M33.3333 4.16669H16.6667V8.33335H33.3333V4.16669Z" fill="#1F7D63"/>
								<path d="M13.5417 16.6667H36.4583" stroke="#1F7D63" stroke-width="1.33333"/>
								<path d="M13.5417 25H36.4583" stroke="#1F7D63" stroke-width="1.33333"/>
								<path d="M13.5417 33.3333H29.1667" stroke="#1F7D63" stroke-width="1.33333"/>
							</svg>
							<h2 className="text-2xl font-bold mb-4" style={{color:"#1f7d63"}}>Широкий ассортимент</h2>
							<p>
								Мы закупаем товары по всему миру — от Европы до Азии. 
								В нашем ассортименте более 400 наименований одежды, техники 
								и товаров для дома.
							</p>
						</div>
						<div className='AdvantageCard'>
							<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M23.5 15.9999L18.75 20.8333V41.6666H40.625C42.3508 41.6666 43.75 40.2675 43.75 38.5416V22.9166C43.75 21.766 42.8173 20.8333 41.6667 20.8333H30.8333L32.5 12.9166C32.895 11.1285 31.2931 9.58331 29.4644 9.58331H29.1667L23.5 15.9999Z" stroke="#1F7D63" stroke-width="1.33333"/>
								<path d="M10.4166 20.8333H16.6666V41.6666H10.4166C9.26606 41.6666 8.33331 40.7339 8.33331 39.5833V22.9166C8.33331 21.766 9.26606 20.8333 10.4166 20.8333Z" stroke="#1F7D63" stroke-width="1.33333"/>
							</svg>
							<h2 className="text-2xl font-bold mb-4" style={{color:"#1f7d63"}}>Высокое качество</h2>
							<p>
								Мы тщательно отбираем поставщиков и проверяем 
								каждый товар. Всё проходит контроль качества, 
								чтобы вы получали только надёжные и долговечные изделия.
							</p>
						</div>
						<div className='AdvantageCard'>
							<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M29 38.5L19 47L19 30L29 38.5Z" fill="#1F7D63"/>
								<path d="M31 30L21 38.5L31 47" fill="#1F7D63"/>
								<path d="M19 31L25 39L31 31" fill="#1F7D63"/>
								<path d="M25 31.25C31.9036 31.25 37.5 25.6536 37.5 18.75C37.5 11.8464 31.9036 6.25 25 6.25C18.0964 6.25 12.5 11.8464 12.5 18.75C12.5 25.6536 18.0964 31.25 25 31.25Z" stroke="#1F7D63" stroke-width="1.33333"/>
								<path d="M25 26.5625C29.3147 26.5625 32.8125 23.0647 32.8125 18.75C32.8125 14.4353 29.3147 10.9375 25 10.9375C20.6853 10.9375 17.1875 14.4353 17.1875 18.75C17.1875 23.0647 20.6853 26.5625 25 26.5625Z" stroke="#1F7D63" stroke-width="1.33333"/>
							</svg>
							<h2 className="text-2xl font-bold mb-4" style={{color:"#1f7d63"}}>Проверенные бренды</h2>
							<p>
								Мы работаем только с надёжными производителями 
								и поставщиками. Весь товар — от известных и проверенных марок.
							</p>
						</div>
					</div>
				</div>
      </div>
    </main>
  );
}
