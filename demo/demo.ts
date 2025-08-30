// demo.ts — чистый TypeScript

// Интерфейсы и типы
interface Person {
  name: string;
  age: number;
  active?: boolean;
}

type Status = 'pending' | 'approved' | 'rejected';

// Класс с дженериками
class Record<T> {
  data: T;
  status: Status;
  createdAt: Date;

  constructor(data: T, status: Status = 'pending') {
    this.data = data;
    this.status = status;
    this.createdAt = new Date();
  }

  update(newData: T): void {
    this.data = newData;
  }

  isRecent(): boolean {
    return Date.now() - this.createdAt.getTime() < 86400000;
  }
}

// Функция с перегрузкой
function format(input: string): string;
function format(input: number): string;
function format(input: string | number): string {
  return typeof input === 'string'
    ? input.toUpperCase()
    : `Number: ${input}`;
}

// Использование
const user: Person = { name: 'Bob', age: 30, active: true };
const record = new Record(user);

console.log(format("hello"));
console.log(format(123));

// Enums
enum LogLevel {
  Debug = 'DEBUG',
  Info = 'INFO',
  Error = 'ERROR'
}

// Const assertions
const keys = ['id', 'name'] as const;

// Литералы и условные типы
type Flatten<T> = T extends any[] ? T[number] : T;
type Item = Flatten<typeof keys>; // 'id' | 'name'