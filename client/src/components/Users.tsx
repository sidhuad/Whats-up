import { useState, useEffect } from "react";

import type { UserData } from "../interfaces/UserData";
import { type JwtPayload, jwtDecode } from 'jwt-decode';
import io from "socket.io-client";

const socket = io("http://localhost:3001");

// Define the props for the component
interface UserListProps {
  users: UserData[] | null; // users can be an array of UserData objects or null
}
interface CustomJwtPayload extends JwtPayload { username: string; }

const UserList: React.FC<UserListProps> = ({ users }) => {
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
  let decodedUserToken: CustomJwtPayload | null = null;
  const currentUserToken = localStorage.getItem('id_token')
  if (currentUserToken) { 
    decodedUserToken = jwtDecode<CustomJwtPayload>(currentUserToken)
  }
  const currentUser = decodedUserToken?.username

  const [recipientID, setRecipientID] = useState(0);
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );

  function getUser(id: number, name: string) {
    setRecipientID(id);
    setRecipientName(name);
    setMessages([]); // Clear chat history when switching users
  }
  const sendMessage = () => {
    if (message.trim() !== "" && recipientID !== 0) {
      const messageData = {
        sender: currentUser,
        recipientID,
        text: message,
      };

      socket.emit("send_message", messageData); // Emit event to backend
      setMessages((prev) => [...prev, { sender: "You", text: message }]);
      setMessage(""); // Clear input field
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.recipientID === recipientID) {
        setMessages((prev) => [...prev, { sender: data.sender, text: data.text }]);
      }
    });
  
    return () => {
      socket.off("receive_message"); // Clean up event listener
    };
  }, [recipientID]);

  return (
    <>
      <div className="container mt-5">
        <h2 className="pb-5 text-center">Check out all your friends!</h2>

        <div className="row">
          {/* Left Column - Users */}
          <div className="col-md-4">
            <section className="card p-3">
              <h4>Users</h4>
              {decodedUserToken && users &&
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

          {/* Right Column - Chatroom */}
          {recipientID !== 0 ? (
            <div className="col-md-8">
              <section className="card">
                <header className="card-header text-center">
                Chatting with {recipientName}
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
                <footer className="card-footer">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message.."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                  </div>
                </footer>
              </section>
            </div>
          ) : (
            <>
              <h1>No User Selected</h1>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5">
        Created by Mike, Ryan, Jenny, and Adarsh
      </footer>
    </>
  );
};

export default UserList;
