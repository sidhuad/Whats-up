import { useState, useEffect } from "react";

import type { UserData } from "../interfaces/UserData";
import { type JwtPayload, jwtDecode } from "jwt-decode";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

// Define the props for the component
interface UserListProps {
  users: UserData[] | null; // users can be an array of UserData objects or null
}
interface CustomJwtPayload extends JwtPayload {
  username: string;
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  let decodedUserToken: CustomJwtPayload | null = null;
  const currentUserToken = localStorage.getItem("id_token");
  if (currentUserToken) {
    decodedUserToken = jwtDecode<CustomJwtPayload>(currentUserToken);
  }
  const currentUser = decodedUserToken?.username;

  const [recipientID, setRecipientID] = useState(0);
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [roomId, setRoomId] = useState("");

  function getUser(id: number, name: string) {
    setRecipientID(id);
    setRecipientName(name);
    setMessages([]); // Clear chat history when switching users
    if (!currentUser) {
      return null;
    }    
  }
  const sendMessage = () => {
    if (message.trim() !== "" && recipientID !== 0) {
      
      const messageData = {
        sender: currentUser,
        recipientID,
        roomId,

        text: message,
      };

      socket.emit("send_message", messageData); // Emit event to backend
      setMessages((prev) => [...prev, { sender: "You", text: message }]);
      setMessage(""); // Clear input field
    }
  };

  // generating a chat room id
  const chatRoomId = (currentUser:string, recipientID:number) => {
    const loggedInUser = users?.find((user) =>  user.username === currentUser);
    const currentUserId = loggedInUser?.id;
    if (!currentUserId) {
      return null;
    }
    return currentUserId < recipientID? `${currentUserId}_${recipientID}`:`${recipientID}_${currentUserId}`
  }

  useEffect(() => {
    
    if(!currentUser || recipientID === 0) return;

    const newRoomId = chatRoomId(currentUser,recipientID);
    if (newRoomId) setRoomId(newRoomId);
    

  },[recipientID])
  console.log(`room id client side ${roomId}`);
  // Listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.recipientID === recipientID) {
        setMessages((prev) => [
          ...prev,
          { sender: data.sender, text: data.text },
        ]);
      }
    });

    return () => {
      socket.off("receive_message"); // Clean up event listener
    };
    
  }, [recipientID]);

  return (
    <div>
      <div className="containerbody mt-5">
        <section className="sidebar">
          <h2 className="friends">Friends!</h2>

          {/* Left Column - Users */}
          <div className="col-md-4">
            <section className="p-3">
              {/* <h4>Users</h4> */}
              {decodedUserToken &&
                users &&
                users
                .filter ((user) => user.username !== currentUser)
                .map((user) => (
                  <div
                    className="d-flex justify-content-start align-items-center mb-3"
                    key={user.id}
                    data-id={user.id}
                  >
                    <div>
                      <h6
                      style={{ cursor: 'pointer'}}
                        onClick={() =>
                          user.id &&
                          user.username &&
                          getUser(user.id, user.username)
                        }
                      >
                        {user.id}. {user.username}
                      </h6>
                    </div>
                  </div>
                ))}
            </section>
          </div>
        </section>
        <section className="statusbar">Status</section>
        {/* Right Column - Chatroom */}
        {recipientID !== 0 ? (
          <section className="chat">
            <header className="card-header text-center">
              Chatroom with {recipientName}
            </header>
            <main
              className="card-body chat-box overflow-auto"
              id="chatBox"
              style={{ height: "400px" }}
            >
              {/* Chat messages go here */}
              {messages.map((msg, index) => (
                <div key={index} className="message mb-3">
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
            </main>
            <section className="card-footer">
              <div className="input-group">
                <input
                  type="text"
                  className="chatbox form-control"
                  placeholder="Type your message.."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button className="button btn-primary" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </section>
          </section>
        ) : (
          <>
            <h1 className="chat">No User Selected</h1>
          </>
        )}
      </div>
      
      <footer className="text-center mt-5">
        Created by Mike, Ryan, Jenny, and Adarsh
      </footer>
    </div>
  );
};

export default UserList;

// if i have to use this code later, i would need to paste it under line 15 bc that's where it was originally
//   const [room, setRoom] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");

//   const joinRoom = () => {
//     if (room !== "") {
//       socket.emit("join_room", room);
//     }
//   };

//   const sendMessage = () => socket.emit("send_message", { message, room });

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageReceived(data.message);
//     });
//   });
