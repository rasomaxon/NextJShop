"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeFromCart, clearCart } from "@/store/slices/cartSlice";
import Link from "next/link";
import Header from '@/components/Header';


export default function CartPage() {
  // Получаем список товаров из корзины из хранилища Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // Получаем функцию для отправки действий в Redux
  const dispatch = useDispatch();

  // Обработчик удаления одного товара по id
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id)); // вызываем действие удаления товара
  };

  // Обработчик очистки всей корзины
  const handleClear = () => {
    dispatch(clearCart()); // вызываем действие очистки корзины
  };

  // Возвращаем JSX — шаблон отображения страницы
  return (
    <div className="flex flex-col items-center my-10">
			<Header></Header>
      <div className="mainContent">
				<h1>Корзина</h1>
				<div className='cartContent'>
					<div className='cartItems'>
						<div className='cartItemsBtns'>
							<button className='clearBtn shareBtn btn' onClick={handleClear}>Очистить корзину</button>
							<button className='shareBtn btn'>
								<svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M14 4.14476L8.41652 0V2.11481C2.9742 2.15532 0 6.64583 0 11C2.00181 11 0.490022 11 2.41172 11C2.66194 9.34971 3.63184 7.48704 4.8009 6.83692C6.00586 6.16684 7.05282 6.23729 8.41652 6.23729V8.28955L14 4.14476Z" fill="white"/>
								</svg>
								Поделиться
							</button>
						</div>
						<div className='cartItemsContainer'>
							{cartItems.length === 0 ? ( 
							<p>Корзина пуста. <Link href="/">Перейти в магазин</Link></p>
							) : (
							<div>
								<ul>
									{cartItems.map((item) => (
										<li key={item.id} className="flex justify-between items-center mb-4">
											<div className='cartItemCart'>
												
												<h2>{item.title}</h2>
												<p>{item.quantity} x {item.price} $</p>
											</div>
											<button
												onClick={() => handleRemove(item.id)}
												className="text-red-600"
											>
												Удалить
											</button>
										</li>
									))}
								</ul>
								<div className="mt-4">
									<button className="px-4 py-2 bg-blue-600 text-white rounded">
										Оформить заказ
									</button>
								</div>
							</div>
							)}
						</div>
					</div>
					<div className='order'>

					</div>
				</div>
			</div>
    </div>
  );
}