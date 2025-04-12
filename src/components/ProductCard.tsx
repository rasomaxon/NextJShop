import Link from "next/link";
import Image from 'next/image';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  quantityInCart: number;
};

export default function ProductCard({
  product,
  onAddToCart,
  onIncrease,
  onDecrease,
  quantityInCart,
}: ProductCardProps) {
  return (
    <div className="itemCard">
      <Link href={`/product/${product.id}`} passHref>
        <div style={{ cursor: 'pointer' }}>
          <Image
            className="itemCard_img"
            src={product.image}
            width={180}
            height={180}
            alt={product.title}
          />
          <p className="text" style={{ fontSize: 20 }}>{product.price} $</p>
          <h2 className="text" style={{ fontSize: 12 }}>{product.title}</h2>
        </div>
      </Link>

      {quantityInCart === 0 ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          style={{ width: 190, height: 40 }}
          className="greenBtn btn"
        >
          В корзину
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.04169 4.16666H4.16714L6.25077 7.29212" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M6.25 7.29166H19.7917L18.2292 16.6667H7.8125L6.25 7.29166Z" stroke="white" strokeWidth="2" />
            <path d="M9.37523 22.3963C10.2383 22.3963 10.938 21.6966 10.938 20.8336C10.938 19.9705 10.2383 19.2708 9.37523 19.2708C8.51216 19.2708 7.8125 19.9705 7.8125 20.8336C7.8125 21.6966 8.51216 22.3963 9.37523 22.3963Z" fill="white" />
            <path d="M17.7085 22.3963C18.5716 22.3963 19.2713 21.6966 19.2713 20.8336C19.2713 19.9705 18.5716 19.2708 17.7085 19.2708C16.8455 19.2708 16.1458 19.9705 16.1458 20.8336C16.1458 21.6966 16.8455 22.3963 17.7085 22.3963Z" fill="white" />
          </svg>
        </button>
      ) : (
        <div className="flex items-center justify-between gap-2 mt-2 w-[190px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDecrease(product.id);
            }}
            className="btn greenBtn" style={{height:40, width:35}}>
            -
          </button>
          <span className="btn greenBtn" style={{height:40, width:130}}>{quantityInCart} в корзине</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onIncrease(product.id);
            }}
            className="btn greenBtn" style={{height:40, width:35}}>
            +
          </button>
        </div>
      )}
    </div>
  );
}
