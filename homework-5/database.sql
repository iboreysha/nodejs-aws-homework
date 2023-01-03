-- Create database user_db
CREATE DATABASE user_db;


-- Create table users in database user_db
CREATE TABLE users (
  db_id SERIAL PRIMARY KEY,
  user_id VARCHAR(50),
  login VARCHAR(50),
  password VARCHAR(50),
  age INTEGER,
  isdeleted BOOLEAN
);


-- Insert test data to table users
INSERT INTO users (user_id, login, password, age, isdeleted)
VALUES ('718dcd31-9fa4-4517-8e78-2556f6b3df29', 'user1', 'pass1', 10, false),
       ('645b1056-d72c-4eda-bc48-fb4f8365136d', 'user2', 'pass2', 20, false),
       ('cb8ed75b-05e9-4f1b-9b82-c4eebeb8620d', 'user3', 'pass3', 30, false);


-- View table users
SELECT * FROM users;
