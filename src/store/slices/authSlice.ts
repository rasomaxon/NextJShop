import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Импортируем необходимые функции из Redux Toolkit

// Интерфейс состояния авторизации
interface AuthState {
  token: string | null; // Хранит токен авторизации
  user: any | null; // Хранит информацию о пользователе
}

// Начальное состояние, когда пользователь не авторизован
const initialState: AuthState = {
  token: null,
  user: null,
};

// Создаём слайс для управления состоянием авторизации
const authSlice = createSlice({
  name: "auth", // Название слайса
  initialState, // Начальное состояние
  reducers: {
    // Редьюсер для установки токена и данных пользователя
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: any }>
    ) => {
      state.token = action.payload.token; // Записываем токен в состояние
      state.user = action.payload.user;   // Записываем данные пользователя в состояние
    },
    // Редьюсер для выхода из системы (очистка состояния)
    logout: (state) => {
      state.token = null; // Очищаем токен
      state.user = null;  // Очищаем данные пользователя
    },
  },
});

// Экспортируем действия (action creators), которые будут использоваться в компонентах
export const { setCredentials, logout } = authSlice.actions;

// Экспортируем редьюсер, который будет добавлен в хранилище Redux
export default authSlice.reducer;
