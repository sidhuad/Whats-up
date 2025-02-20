import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
// import bcrypt from 'bcrypt';

// Define the attributes for the MESSAGES model
interface MessagesAttributes {
  id: number;
  sender: string;
  conversation_id: number;
  body: string;
  status: string;
}

// Define the optional attributes for creating a new Messages
interface MessagesCreationAttributes extends Optional<MessagesAttributes, 'id'> {}

// Define the Messages class extending Sequelize's Model
export class Messages extends Model<MessagesAttributes, MessagesCreationAttributes> implements MessagesAttributes {
  public id!: number;
  public sender!: string;
  public conversation_id!: number;
  public body!: string;
  public status!: string;


  // public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Method to hash and set the password for the Messages
//   public async setPassword(password: string) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(password, saltRounds);
//   }
}

// Define the MessagesFactory function to initialize the Messages model
export function MessagesFactory(sequelize: Sequelize): typeof Messages {
  Messages.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'sent'
      },
    },
    {
      tableName: 'messages',  // Name of the table in PostgreSQL
      sequelize,// The Sequelize instance that connects to PostgreSQL
      timestamps:false,
    //   hooks: {
    //     // Before creating a new user, hash and set the password
    //     beforeCreate: async (user: User) => {
    //       await user.setPassword(user.password);
    //     },
    //     // Before updating a user, hash and set the new password if it has changed
    //     beforeUpdate: async (user: User) => {
    //       if (user.changed('password')) {
    //         await user.setPassword(user.password);
    //       }
    //     },
    //   }
    }
  );

  return Messages;  // Return the initialized User model
}

export default Messages;