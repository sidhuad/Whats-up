\c postgres

-- DROP DATABASE
DROP DATABASE IF EXISTS users_db;

-- CREATE DATABASE
CREATE DATABASE users_db;

\c users_db

-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(30) NOT NULL,
--   username VARCHAR(30) UNIQUE NOT NULL,
--   email VARCHAR(50) UNIQUE NOT NULL,
--   password VARCHAR(60) NOT NULL,);

-- CREATE TABLE conversations (
--   id SERIAL PRIMARY KEY,
--   sender_id INTEGER NOT NULL,
--   receiver_id INTEGER NOT NULL,
--   FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
--   FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- CREATE TABLE messages (
--   id SERIAL PRIMARY KEY,
--   conversation_id INTEGER NOT NULL,
--   body TEXT NOT NULL,
--   status VARCHAR(20) DEFAULT 'sent',
--   FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
-- );
