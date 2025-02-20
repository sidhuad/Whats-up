import { Messages } from "../models/Messages";
import { Conversations } from "../models/Conversations";

export const getConversationID = async (sender: number, reciever: number) => {
  const convID = await Conversations.findOne({
    where: {
      sender_id: sender || reciever,
      receiver_id: reciever || sender,
    },
  });

  if (convID) {
    const conversationId = convID.id;
    return conversationId;
  }
  console.log("Conversation not found.");
  return;
};

// add some error handling here - try/catch
export const addMessage = async (sender: string, conversation_id: number, body: string) => {
  await Messages.create({
    sender,
    conversation_id,
    body,
    status: "sent",
  });
};
