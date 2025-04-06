import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Импортируем необходимые функции из Redux Toolkit

// Интерфейс для элемента корзины
interface CartItem {
  id: number; // Уникальный идентификатор товара
  title: string; // Название товара
  quantity: number; // Количество товара в корзине
  price: number; // Цена товара
}

// Интерфейс состояния корзины
interface CartState {
  items: CartItem[]; // Массив товаров в корзине
}

// Начальное состояние корзины (пустая корзина)
const initialState: CartState = {
  items: [],
};

// Создаём слайс для управления состоянием корзины
const cartSlice = createSlice({
  name: "cart", // Название слайса
  initialState, // Начальное состояние
  reducers: {
    // Редьюсер для добавления товара в корзину
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(i => i.id === action.payload.id); // Ищем товар в корзине по ID
      if (item) {
        // Если товар уже есть в корзине, увеличиваем его количество
        item.quantity += action.payload.quantity;
      } else {
        // Если товара нет в корзине, добавляем его
        state.items.push(action.payload);
      }
    },
    // Редьюсер для удаления товара из корзины
    removeFromCart: (state, action: PayloadAction<number>) => {
      // Фильтруем корзину, оставляем только те товары, у которых ID не совпадает с переданным
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    // Редьюсер для очистки корзины
    clearCart: (state) => {
      state.items = []; // Очищаем корзину
    },
  },
});

// Экспортируем действия (action creators), которые будут использоваться в компонентах
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Экспортируем редьюсер, который будет добавлен в хранилище Redux
export default cartSlice.reducer;
