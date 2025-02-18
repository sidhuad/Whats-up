import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
// import bcrypt from 'bcrypt';

// Define the attributes for the User model
interface ConversationsAttributes {
  id: number;
  sender_id: number;
  receiver_id: number;
}

// Define the optional attributes for creating a new Conversations
interface ConversationsCreationAttributes extends Optional<ConversationsAttributes, 'id'> {}

// Define the Conversations class extending Sequelize's Model
export class Conversations extends Model<ConversationsAttributes, ConversationsCreationAttributes> implements ConversationsAttributes {
  public id!: number;
  public sender_id!: number;
  public receiver_id!: number;

//   public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

// Define the ConversationsFactory function to initialize the Conversation model
export function ConversationsFactory(sequelize: Sequelize): typeof Conversations {
  Conversations.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'conversations',  // Name of the table in PostgreSQL
      sequelize,// The Sequelize instance that connects to PostgreSQL
    //   hooks: {
    //     // Before creating a new user, hash and set the password
    //     beforeCreate: async (conversation: Conversations) => {
    //       await conversation.setPassword(conversation.password);
    //     },
    //     // Before updating a Conversations, hash and set the new password if it has changed
    //     beforeUpdate: async (user: User) => {
    //       if (user.changed('password')) {
    //         await user.setPassword(user.password);
    //       }
    //     },
    //   }
    }
  );

  return Conversations;  // Return the initialized User model
}
