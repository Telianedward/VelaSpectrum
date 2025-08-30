// demo.tsx — идеальный пример для демонстрации
import React, { useState, useEffect } from 'react';

// 🟢 Комментарий — проверка подсветки
/**
 * Это функциональный компонент с хуками,
 * типами и JSX — всё в одном месте.
 */
const UserProfile: React.FC = () => {
  // 🔵 Переменная, тип, хук
  const [user, setUser] = useState<{ name: string; age: number } | null>(null);

  // 🟡 useEffect — хук, ключевое слово, стрелочная функция
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('Error:', err)); // 🔴 Ошибка
  }, []);

  // 🟣 JSX: теги, атрибуты, вставка выражений
  return (
    <div className="user-profile" data-active={!!user}>
      <h1>Welcome, {user?.name ?? 'Guest'}!</h1>
      {user && <p>Age: {user.age}</p>}
      <button onClick={() => setUser(null)}>Reset</button>
    </div>
  );
};

export default UserProfile;

// 🟤 Rust-подобная структура (для синтаксиса)
type Config = {
  debug: boolean;
  timeout: number;
};

const config: Config = {
  debug: true,
  timeout: 5000,
};