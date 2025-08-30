<?php

/**
 * Демо-файл PHP: классы, функции, типизация, трейты, пространства имён.
 */

declare(strict_types=1);

namespace App\Demo;

// Включение внешнего файла
require_once 'config.php';

// Трейт
trait Loggable {
    public function log($message): void {
        echo "[LOG] " . $message . "\n";
    }
}

// Интерфейс
interface Renderable {
    public function render(): string;
}

// Класс с типизацией
class User implements Renderable {
    use Loggable;

    private string $name;
    private int $age;

    public function __construct(string $name, int $age) {
        $this->name = $name;
        $this->age = $age;
    }

    public function render(): string {
        return "<div>Hello, {$this->name}!</div>";
    }

    public function isAdult(): bool {
        return $this->age >= 18;
    }
}

// Функция с union type (PHP 8+)
function processValue(string|int $value): void {
    if (is_string($value)) {
        echo "String: $value\n";
    } else {
        echo "Number: $value\n";
    }
}

// Использование
$user = new User("Alice", 25);
$user->log("User created");
echo $user->render();

processValue("test");
processValue(42);

// Массивы и циклы
$fruits = ['apple', 'banana', 'cherry'];
foreach ($fruits as $fruit) {
    echo "Fruit: $fruit\n";
}

?>