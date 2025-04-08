"use client";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <header>
      <Link href="/" className="logo">
        <Image src="/images/logo_long.png" width={143} height={50} alt="Logo" />
      </Link>

      <button onClick={() => {}} className="greenBtn btn catalogBtn">
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p style={{ fontSize: 20 }}>каталог</p>
      </button>

      <div className="search">
        {/* Здесь можно подключить пропсы если нужно взаимодействие с поиском */}
        <input
          type="search"
          className="searchField"
          placeholder="Поиск..."
          disabled
        />
        <button className="searchBtn">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.111 17.7083C15.5627 17.7083 18.361 14.9101 18.361 11.4583C18.361 8.00655 15.5627 5.20833 12.111 5.20833C8.65918 5.20833 5.86096 8.00655 5.86096 11.4583C5.86096 14.9101 8.65918 17.7083 12.111 17.7083Z"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M16.7985 16.1458L21.486 20.8333"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <ul className="headerIcons flex">
        <li className="userIcon">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 14C16.5774 14 18.6667 11.9107 18.6667 9.33333C18.6667 6.756 16.5774 4.66666 14 4.66666C11.4227 4.66666 9.33337 6.756 9.33337 9.33333C9.33337 11.9107 11.4227 14 14 14Z" stroke="#1f7d63" strokeWidth="2" />
            <path d="M4.66663 23.3333C4.66663 18.6667 9.33329 16.3333 14 16.3333C18.6666 16.3333 23.3333 18.6667 23.3333 23.3333" stroke="#1f7d63" strokeWidth="2" />
          </svg>
        </li>
        <li className="cartPrice" style={{ cursor: "pointer" }}>
          <Link href="/cart" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.04169 4.16666H4.16714L6.25077 7.29212" stroke="#1f7d63" strokeWidth="2" strokeLinecap="round" />
              <path d="M6.25 7.29166H19.7917L18.2292 16.6667H7.8125L6.25 7.29166Z" stroke="#1f7d63" strokeWidth="2" />
              <path d="M9.37523 22.3963C10.2383 22.3963 10.938 21.6966 10.938 20.8336C10.938 19.9705 10.2383 19.2708 9.37523 19.2708C8.51216 19.2708 7.8125 19.9705 7.8125 20.8336C7.8125 21.6966 8.51216 22.3963 9.37523 22.3963Z" fill="#1f7d63" />
              <path d="M17.7085 22.3963C18.5716 22.3963 19.2713 21.6966 19.2713 20.8336C19.2713 19.9705 18.5716 19.2708 17.7085 19.2708C16.8455 19.2708 16.1458 19.9705 16.1458 20.8336C16.1458 21.6966 16.8455 22.3963 17.7085 22.3963Z" fill="#1f7d63" />
            </svg>
            <p className="price">{totalPrice.toFixed(2)} $</p>
          </Link>
        </li>
      </ul>
    </header>
  );
}