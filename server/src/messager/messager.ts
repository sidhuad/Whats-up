import { Messages } from "../models/Messages";
import { Conversations } from "../models/Conversations";

export const addMessage = async (
  sender: number,
  reciever: number,
  message: string
) => {
  const convID = await Conversations.findOne({
    where: {
      sender_id: sender,
      receiver_id: reciever,
    },
  });

  if (convID) {
    const conversationId = convID.id;

    const newMessage = await Messages.create({
      conversation_id: conversationId,
      body: message,
      status: "sent",
    });

    return newMessage;
  } else {
    console.log("Conversation not found.");
    return;
  }
};
