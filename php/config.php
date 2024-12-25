<?php
class Database {
    private $db;

    public function __construct() {
        try {
            $this->db = new SQLite3(__DIR__ . '/../database/users.db');
            $this->createTables();
        } catch (Exception $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }

    private function createTables() {
        // Таблица пользователей
        $query = "CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )";
        $this->db->exec($query);

        // Таблица подписчиков
        $query = "CREATE TABLE IF NOT EXISTS subscribers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )";
        $this->db->exec($query);
    }

    public function getConnection() {
        return $this->db;
    }
}
?>