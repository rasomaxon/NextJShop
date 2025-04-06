import "./globals.css"; // Подключение глобальных CSS-стилей
import ReduxProvider from "@/providers/ReduxProvider"; // Импорт обёртки Redux

// Типизация пропсов для layout-компонента
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Корневой HTML-документ — ОБЯЗАТЕЛЕН в Next.js 13+
    <html lang="ru">
      <head>
        {/* Кодировка и настройки адаптивности */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Магазин</title>
      </head>
      <body>
        {/* Обёртка Redux для работы с хранилищем во всём приложении */}
        <ReduxProvider>
          {children} {/* Отображение всех страниц и компонентов */}
        </ReduxProvider>
      </body>
    </html>
  );
}
