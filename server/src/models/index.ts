import sequelize from '../config/connection.js'
import { MessagesFactory } from './Messages.js';
import { UserFactory } from './User.js';
import { ConversationsFactory } from './Convesations.js';

const User = UserFactory(sequelize);
const Conversation = ConversationsFactory(sequelize);
const Messages = MessagesFactory(sequelize);

export { User, Conversation, Messages };
