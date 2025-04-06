import Link from "next/link";

// Типизация данных продукта
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

// Компонент карточки товара
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded-lg">
      {/* Картинка товара */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover mb-4"
      />

      {/* Название товара */}
      <h2 className="font-semibold">{product.title}</h2>

      {/* Цена */}
      <p className="text-xl">{product.price} $</p>

      {/* Ссылка на подробную страницу */}
      <Link href={`/products/${product.id}`} className="text-blue-500 mt-2 block">
        Подробнее
      </Link>
    </div>
  );
}
