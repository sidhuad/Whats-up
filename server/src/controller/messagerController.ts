import { Messages } from "../models/Messages";
import { Conversations } from "../models/Conversations";

export const getConversationID = async (sender: number, reciever: number) => {
  const convID = await Conversations.findOne({
    where: {
      sender_id: sender,
      receiver_id: reciever,
    },
  });

  if (convID) {
    const conversationId = convID.id;
    return conversationId;
  }
  console.log("Conversation not found.");
  return;
};

export const addMessage = async (conversation_id: number, body: string) => {
  await Messages.create({
    conversation_id,
    body,
    status: "sent",
  });
};
