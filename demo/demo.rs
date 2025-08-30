// demo.rs — Rust с модулями, трейтами, async, макросами

use std::collections::HashMap;
use std::fmt;

// Макрос
macro_rules! log {
    ($($arg:tt)*) => {
        println!("[INFO] {}", format_args!($($arg)*));
    };
}

// Трейт
trait Displayable {
    fn display(&self) -> String;
}

// Перечисление
#[derive(Debug)]
enum Status {
    Active,
    Inactive,
    Pending,
}

// Структура
struct User {
    name: String,
    age: u8,
    status: Status,
}

// Реализация
impl fmt::Display for User {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{} ({} years, {:?})", self.name, self.age, self.status)
    }
}

impl Displayable for User {
    fn display(&self) -> String {
        format!("User: {}", self.name)
    }
}

// Жизненные циклы и обобщения
fn get_value<T>(map: &HashMap<String, T>, key: &str) -> Option<&T> {
    map.get(key)
}

// Асинхронная функция
async fn fetch_data() -> Result<String, Box<dyn std::error::Error>> {
    log!("Fetching data...");
    Ok("Data loaded".to_string())
}

// Модуль
mod utils {
    pub fn is_adult(age: u8) -> bool {
        age >= 18
    }
}

// Главная функция
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut users = HashMap::new();
    users.insert(
        "alice".to_string(),
        User {
            name: "Alice".to_string(),
            age: 25,
            status: Status::Active,
        },
    );

    if let Some(user) = get_value(&users, "alice") {
        println!("{}", user);
        println!("{}", user.display());
    }

    let data = fetch_data().await?;
    println!("{}", data);

    Ok(())
}