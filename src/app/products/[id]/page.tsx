"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from 'next/image';
import Header from "@/components/Header";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState("");
  const [productImages, setProductImages] = useState<string[]>([]);
  const discount = 0;

  const fetchProduct = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) return;
    const data = await res.json();
    
    const images = [
      data.image,
      "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg"
    ];

    setProduct(data);
    setProductImages(images);
    setMainImage(images[0]);
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  if (!product || productImages.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center my-10">
      <Header />
      <div className="mainContent">
        <div className="itemCardContent">
          {/* Первая колонка - изображения */}
          <div className="image-column">
            <div className="thumbnail-container">
              {productImages.map((image, index) => (
                <div 
                  key={index}
                  onMouseEnter={() => setMainImage(image)}
                  className={`thumbnail ${mainImage === image ? "active" : ""}`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} variant ${index}`}
                    fill
                    className="thumbnail-img"
                  />
                </div>
              ))}
            </div>
            <div className="main-image-container">
              <Image
                src={mainImage}
                alt={product.title}
                fill
                className="main-image"
                priority
              />
            </div>
          </div>

          {/* Вторая колонка - информация */}
          <div className="info-column">
            <h1 className="product-title" style={{fontSize:40}}>{product.title}</h1>
            <p className="product-description">{product.description}</p>
          </div>

          {/* Третья колонка - заказ */}
          <div className="order-column">
            <div className="price-row">
              <span>Цена:</span>
              <span>{product.price} $</span>
            </div>
            {discount > 0 && (
              <div className="discount-row">
                <span>Скидка:</span>
                <span>-{discount} $</span>
              </div>
            )}
            <button className="add-to-cart">Добавить в корзину</button>
            <button className="buy-now">Купить сейчас</button>
          </div>
        </div>
      </div>
    </div>
  );
}