-- Création de la base de données
CREATE DATABASE IF NOT EXISTS parc_animalier;
USE parc_animalier;

-- Table pour les utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour les biomes (zones du parc)
CREATE TABLE IF NOT EXISTS biomes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    color_code VARCHAR(7) NOT NULL, -- Code couleur pour représenter chaque biome
    description TEXT
);

-- Table pour les enclos
CREATE TABLE IF NOT EXISTS enclosures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    biome_id INT,
    description TEXT,
    image_url VARCHAR(255),
    status ENUM('open', 'under_construction') DEFAULT 'open', -- En travaux ou ouvert
    FOREIGN KEY (biome_id) REFERENCES biomes(id) ON DELETE SET NULL
);

-- Table pour les animaux
CREATE TABLE IF NOT EXISTS animals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    species VARCHAR(100),
    description TEXT,
    enclosure_id INT,
    FOREIGN KEY (enclosure_id) REFERENCES enclosures(id) ON DELETE CASCADE
);

-- Table pour les services du parc
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(100)
);

-- Table pour les avis des utilisateurs sur les enclos
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enclosure_id INT NOT NULL,
    user_id INT NOT NULL,
    rating TINYINT CHECK (rating BETWEEN 1 AND 5), -- Note entre 1 et 5
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (enclosure_id) REFERENCES enclosures(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table pour la billetterie
CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    num_tickets INT NOT NULL CHECK (num_tickets > 0),
    visit_date DATE NOT NULL,
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
