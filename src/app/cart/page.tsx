"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/store/slices/cartSlice";
import Link from "next/link";
import Header from "@/components/Header";
import CartItemCard from "@/components/CartItemCard";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const handleClear = () => {
    dispatch(clearCart());
  };
	const totalItems = cartItems.reduce(
  (acc, item) => acc + item.quantity,
  0);
	const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity,
	0);
	const discount = 0;
  return (
    <div className="flex flex-col items-center my-10">
      <Header />
      <div className="mainContent">
        <h1 className="text-2xl font-bold mb-4" style={{color:"#1f7d63"}}>Корзина</h1>
        <div className="cartContent">
          <div className="cartItems">
            <div className="cartBtns flex gap-4" style={{ marginBottom: 15 }}>
              <button className="clearBtn shareBtn btn" onClick={handleClear}>
                Очистить корзину
              </button>
              <button className="shareBtn btn flex items-center gap-2">
                <svg
                  width="14"
                  height="11"
                  viewBox="0 0 14 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 4.14476L8.41652 0V2.11481C2.9742 2.15532 0 6.64583 0 11C2.00181 11 0.490022 11 2.41172 11C2.66194 9.34971 3.63184 7.48704 4.8009 6.83692C6.00586 6.16684 7.05282 6.23729 8.41652 6.23729V8.28955L14 4.14476Z"
                    fill="white"
                  />
                </svg>
                <p>Поделиться</p>
              </button>
            </div>

            {cartItems.length === 0 ? (
							<div className='flex flex-col justify-center'>
								<p>Корзина пуста.</p>
								<Link className='greenBtn btn' href="/">Перейти в магазин</Link>
							</div>
            ) : (
              <ul className="cartItemsContainer flex flex-col gap-4">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <CartItemCard
                      item={item}
                      onIncrease={() => dispatch(increaseQuantity(item.id))}
                      onDecrease={() => dispatch(decreaseQuantity(item.id))}
                      onRemove={() => dispatch(removeFromCart(item.id))}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="order">
            <h1 className="text-2xl font-bold mb-4" style={{color:"#1f7d63"}}>Оформить заказ</h1>
            <div className="orderContent">
              <button className="btn greenBtn" style={{ height: 50 }}>
                {" "}
                Перейти к оформлению{" "}
              </button>
              <span style={{fontSize:12, color:"#A7A7A7"}}>
                Доступные способы и время доставки можно выбрать при оформлении
                заказа
              </span>
							<div className='cartTotal'>
								<span style={{fontSize:20}}>Ваша корзина</span>
								<span style={{fontSize:20, color:"#A7A7A7"}}>товаров: {totalItems}</span>
							</div>
							<div className='cartTotal'>
								<span>Сумма</span>
								<div></div>
								<span>{totalPrice.toFixed(2)} $</span>
							</div>
							<div className='cartTotal'>
								<span>Скидка</span>
								<div></div>
								<span style={{color:"#C74545"}}>{discount.toFixed(2)} $</span>
							</div>
							<div className='cartTotal'>
								<span style={{fontSize:20}}>ИТОГО:</span>
								<div></div>
								<span style={{fontSize:20, color:"#1f7d63", marginTop:30}}>{(totalPrice.toFixed(2) - discount).toFixed(2)} $</span>
							</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
