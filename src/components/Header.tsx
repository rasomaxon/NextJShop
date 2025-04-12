"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type HeaderProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export default function Header({ searchTerm, setSearchTerm }: HeaderProps) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
        <input
          type="text"
          className="searchField"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchBtn btn">
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
        <li className="userIcon btn greenBtn">
					<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.5 12.5C14.8012 12.5 16.6667 10.6345 16.6667 8.33333C16.6667 6.03214 14.8012 4.16666 12.5 4.16666C10.1989 4.16666 8.33337 6.03214 8.33337 8.33333C8.33337 10.6345 10.1989 12.5 12.5 12.5Z" stroke="white" stroke-width="2"/>
						<path d="M4.16663 20.8333C4.16663 16.6667 8.33329 14.5833 12.5 14.5833C16.6666 14.5833 20.8333 16.6667 20.8333 20.8333" stroke="white" stroke-width="2"/>
					</svg>
				</li>
        <li>
          <Link href="/cart">
						<div className="cartIcon btn greenBtn">
							<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1.04163 4.16667H4.16663L6.24996 7.29167" stroke="white" stroke-width="2" stroke-linecap="round"/>
								<path d="M6.25 7.29166H19.7917L18.2292 16.6667H7.8125L6.25 7.29166Z" stroke="white" stroke-width="2"/>
								<path d="M9.375 22.3958C10.2379 22.3958 10.9375 21.6963 10.9375 20.8333C10.9375 19.9704 10.2379 19.2708 9.375 19.2708C8.51206 19.2708 7.8125 19.9704 7.8125 20.8333C7.8125 21.6963 8.51206 22.3958 9.375 22.3958Z" fill="white"/>
								<path d="M17.7084 22.3958C18.5713 22.3958 19.2709 21.6963 19.2709 20.8333C19.2709 19.9704 18.5713 19.2708 17.7084 19.2708C16.8454 19.2708 16.1459 19.9704 16.1459 20.8333C16.1459 21.6963 16.8454 22.3958 17.7084 22.3958Z" fill="white"/>
							</svg>
							<p>{totalPrice.toFixed(2)} $</p>
						</div>
          </Link>
        </li>
      </ul>
    </header>
  );
}
