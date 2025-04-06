"use client"; // Обозначает, что компонент используется на стороне клиента

import { ReactNode } from "react";
import { Provider } from "react-redux"; // Оборачивает приложение для подключения Redux
import { store, persistor } from "@/store"; // Импорт хранилища Redux и persistor для redux-persist
import { PersistGate } from "redux-persist/integration/react"; // Оборачивает приложение для восстановления состояния из localStorage

// Типизация пропса children, ожидается React-узел
export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    // Подключаем Redux-хранилище ко всему приложению
    <Provider store={store}>
      {/* PersistGate задерживает рендеринг UI до восстановления состояния */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
