\c word_game_dev;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_digest TEXT NOT NULL,
    nickname VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    currency INTEGER
);

CREATE TABLE IF NOT EXISTS words (
    id SERIAL PRIMARY KEY,
    spell VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users_words (
    id SERIAL PRIMARY KEY,
    spell VARCHAR(255),
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    img_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users_characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    img_url VARCHAR(255),
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    usage VARCHAR(255),
    price INTEGER
);

CREATE TABLE IF NOT EXISTS users_inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    usage VARCHAR(255),
    price INTEGER,
    user_id INTEGER REFERENCES users(id)
);