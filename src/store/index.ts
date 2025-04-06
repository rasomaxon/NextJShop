import { configureStore } from '@reduxjs/toolkit'; // Импортируем функцию для конфигурации хранилища
import { combineReducers } from 'redux'; // Для объединения нескольких редьюсеров
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'; // Импортируем функционал для работы с redux-persist
import storage from 'redux-persist/lib/storage'; // Используем локальное хранилище (localStorage)

// Импортируем редьюсеры
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

// Объединяем все редьюсеры в один
const rootReducer = combineReducers({
  auth: authReducer, // Редьюсер для аутентификации
  cart: cartReducer, // Редьюсер для корзины
});

// Конфигурация для redux-persist
const persistConfig = {
  key: 'root', // Основной ключ для сохранения
  storage, // Хранилище, используем localStorage
  whitelist: ['auth', 'cart'], // Указываем, какие редьюсеры нужно сохранять
};

// Оборачиваем редьюсер в persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаём хранилище с учетом persistReducer
export const store = configureStore({
  reducer: persistedReducer, // Используем редьюсер с persist
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем ошибки сериализации для некоторых действий от redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Создаём persistStore для сохранения состояния
export const persistor = persistStore(store);

// Типы для использования в приложении
export type RootState = ReturnType<typeof store.getState>; // Тип для состояния всего хранилища
export type AppDispatch = typeof store.dispatch; // Тип для диспетчера
