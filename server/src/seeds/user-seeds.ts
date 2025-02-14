import { User } from '../models/index.js';
import { Conversation } from '../models/index.js';
import { Messages } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { name: 'Alice Johnson', username: 'alicej', email: 'alice@example.com', password: 'password1123' },
    { name: 'Bob Smith', username: 'bobsmith', email: 'bob@example.com', password: 'password1223' },
    { name: 'Charlie Brown', username: 'charlieb', email: 'charlie@example.com', password: 'password1234' },
  ], { individualHooks: true });
};

export const seedConversations = async () => {
  await Conversation.bulkCreate([
    { sender_id: 1, receiver_id: 2},
    { sender_id: 2, receiver_id: 1},
    { sender_id: 1, receiver_id: 3}
  ], { individualHooks: true });
};

export const seedMessages = async () => {
  await Messages.bulkCreate([
    { conversation_id: 1, body: 'Hi Bob, how are you?', status: ''},
    { conversation_id: 1, body: 'I am good Alice, thanks for asking!', status: ''},
    { conversation_id: 2, body: 'Hey Alice, are you coming to the event?', status: ''},
    { conversation_id: 3, body: 'Hello Charlie, long time no see!', status: ''}
  ], { individualHooks: true });
};
