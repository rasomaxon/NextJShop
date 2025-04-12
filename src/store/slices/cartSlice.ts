import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Импортируем необходимые функции из Redux Toolkit

// Интерфейс для элемента корзины
interface CartItem {
  id: number; // Уникальный идентификатор товара
  title: string; // Название товара
  quantity: number; // Количество товара в корзине
  price: number; // Цена товара
  description: string;
  category: string;
  image: string;
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
	addToCart: (state, action: PayloadAction<Product>) => {
		const item = state.items.find((i) => i.id === action.payload.id);
		if (item) {
			if (item.quantity < 99) {
				item.quantity += 1;
			}
		} else {
			state.items.push({ ...action.payload, quantity: 1 });
		}
	},
  removeFromCart: (state, action: PayloadAction<number>) => {
    state.items = state.items.filter(i => i.id !== action.payload);
  },
  clearCart: (state) => {
    state.items = [];
  },
	increaseQuantity: (state, action: PayloadAction<number>) => {
		const item = state.items.find((item) => item.id === action.payload);
		if (item && item.quantity < 99) {
			item.quantity += 1;
		}
	},
  decreaseQuantity: (state, action: PayloadAction<number>) => {
    const item = state.items.find(i => i.id === action.payload);
    if (item) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    }
  }
}});

// Экспортируем действия (action creators), которые будут использоваться в компонентах
export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;


// Экспортируем редьюсер, который будет добавлен в хранилище Redux
export default cartSlice.reducer;
