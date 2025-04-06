"use client"; // Это указывает, что компонент будет рендериться на клиенте, а не на сервере. Обязательно для работы useState, useEffect, useSelector и других клиентских хуков.

// Импорт хуков из react-redux для получения состояния и отправки действий
import { useSelector, useDispatch } from "react-redux";
// Импорт типа корневого состояния хранилища Redux
import { RootState } from "@/store";
// Импортируем экшены (действия) для удаления товара и очистки корзины
import { removeFromCart, clearCart } from "@/store/slices/cartSlice";
// Импорт компонента Link из Next.js для переходов по маршрутам без перезагрузки страницы
import Link from "next/link";

// Основной компонент страницы корзины
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Корзина</h1>

      {cartItems.length === 0 ? ( // Проверяем — если корзина пустая, выводим сообщение и ссылку на магазин
        <p>Корзина пуста. <Link href="/">Перейти в магазин</Link></p>
      ) : ( // Если товары есть — показываем список
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p>{item.quantity} x {item.price} $</p> {/* Показываем количество и цену */}
                </div>
                <button
                  onClick={() => handleRemove(item.id)} // При нажатии — удалить товар
                  className="text-red-600"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <button
              onClick={handleClear} // При нажатии — очистить корзину
              className="px-4 py-2 bg-red-600 text-white rounded mr-4"
            >
              Очистить корзину
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Оформить заказ {/* Пока не реализовано, просто кнопка */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}