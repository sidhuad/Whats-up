INSERT INTO users (name, username, email, password) VALUES 
('Alice Johnson', 'alicej', 'alice@example.com', 'password123'),
('Bob Smith', 'bobsmith', 'bob@example.com', 'password123'),
('Charlie Brown', 'charlieb', 'charlie@example.com', 'password123');

-- Seed data for conversations
-- Alice (id=1) is talking to Bob (id=2)
INSERT INTO conversations (sender_id, receiver_id) VALUES 
(1, 2),
(2, 1),
(1, 3);

-- Seed data for messages
-- Messages in the first conversation between Alice and Bob
INSERT INTO messages (conversation_id, body, status) VALUES 
(1, 'Hi Bob, how are you?', 'sent'),
(1, 'I am good Alice, thanks for asking!', 'sent'),
(2, 'Hey Alice, are you coming to the event?', 'sent'),
(3, 'Hello Charlie, long time no see!', 'sent');