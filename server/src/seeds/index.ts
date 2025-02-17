import { seedConversations, seedMessages, seedUsers } from './user-seeds.js';
import sequelize from '../config/connection.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedConversations();
    console.log('\n----- CONVERSATIONS SEEDED -----\n');

    await seedMessages();
    console.log('\n----- MESSAGES SEEDED -----\n')
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
