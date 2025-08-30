// demo.cpp — C++ с классами, шаблонами, STL

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <memory>

// Пространство имён
namespace Demo {

// Шаблонный класс
template<typename T>
class Container {
private:
    std::vector<T> data;

public:
    void add(const T& item) {
        data.push_back(item);
    }

    void print() const {
        for (const auto& item : data) {
            std::cout << item << " ";
        }
        std::cout << std::endl;
    }
};

// Перечисление
enum class Color {
    Red,
    Green,
    Blue
};

// Класс с конструктором и методами
class Shape {
protected:
    std::string name;

public:
    explicit Shape(const std::string& n) : name(n) {}

    virtual ~Shape() = default;

    virtual void draw() const {
        std::cout << "Drawing " << name << std::endl;
    }

    const std::string& getName() const {
        return name;
    }
};

// Наследование
class Circle : public Shape {
public:
    Circle() : Shape("Circle") {}

    void draw() const override {
        std::cout << "🔵 Drawing a circle..." << std::endl;
    }
};

} // namespace Demo

int main() {
    using namespace Demo;

    // Умные указатели
    auto shape = std::make_unique<Circle>();
    shape->draw();

    // Шаблон
    Container<std::string> strings;
    strings.add("Hello");
    strings.add("World");
    strings.print();

    // Lambda
    std::vector<int> nums = {3, 1, 4, 1, 5};
    std::sort(nums.begin(), nums.end(), [](int a, int b) {
        return a > b;
    });

    for (int n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;

    return 0;
}