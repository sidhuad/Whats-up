import { useState, useEffect } from "react";

import type { UserData } from "../interfaces/UserData";
import { type JwtPayload, jwtDecode } from "jwt-decode";
import io from "socket.io-client";
import { getMessages } from "../api/messagesAPI";

// import 'bootstrap/dist/css/bootstrap.min.css';

// https://whats-up-7ihm.onrender.com
const socket = io("https://whats-up-7ihm.onrender.com");

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

  const [recipientID, setRecipientID] = useState<number>(0);
  const [recipientName, setRecipientName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    [] as any
  );
  const [roomId, setRoomId] = useState<string>("");
  // const [showMessages, setShowMessages] = useState<{sender: string; text: string}[]>([]);

  // check if socket is connected
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`-------------------------------`);
      console.log(`socket is connected! ${socket.id}`);
      console.log(`-------------------------------`);
    });
    socket.on("disconnect", () => {
      console.log(`socket is disconnected`);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
    // console.log(`socket connected?: ${socket.connected}`);
  }, []);

  useEffect(() => {
    if (!roomId) {
      console.log('No room ID available')
      return
    }
    
    const displayMessages = async () => {
      const displayedMessages = await getMessages(roomId);
      setMessages(displayedMessages);
    };
    displayMessages();
  }, [roomId]);

  // useEffect(() => {
     
  //   console.log(`this is showMessages ${JSON.stringify(showMessages)}`);
  // }, [showMessages]);

  function getUser(id: number, name: string) {
    setRecipientID(id);
    setRecipientName(name);
    setMessages([]); // Clear chat history when switching users
    if (!currentUser) {
      return null;
    }
  }

  // function getMessages(conversation_id: number) {

  // }
  const sendMessage = async () => {
    if (message.trim() !== "" && recipientID !== 0) {
      const messageData = {
        sender: currentUser,
        recipientID,
        roomId,
        text: message,
      };

      console.log(`sending message:`, messageData.text);
      // console.log(`messages ${messages}`);

      await socket.emit("send_message", messageData); // Emit event to backend
      setMessages((prev) => [
        ...prev,
        { sender: "you", text: messageData.text },
      ]);
      setMessage(""); // Clear input field
    }
  };

  // generating a chat room id
  const chatRoomId = (currentUser: string, recipientID: number) => {
    const loggedInUser = users?.find((user) => user.username === currentUser);
    const currentUserId = loggedInUser?.id;
    if (!currentUserId) {
      return null;
    }
    return currentUserId < recipientID
      ? `${currentUserId}${recipientID}`
      : `${recipientID}${currentUserId}`;
  };

  useEffect(() => {
    if (!currentUser || recipientID === 0) return;

    const newroomId = chatRoomId(currentUser, recipientID);
    if (newroomId) setRoomId(newroomId);
    console.log(`room id client side ${newroomId}`);
    socket.emit("join_room", newroomId);
  }, [recipientID]);

  // Listen for incoming messages
  useEffect(() => {
    if (!roomId) return;

    const handleReceiveMessage = (data: {
      sender: string;
      text: string;
      roomId: string;
    }) => {
      console.log("Received message:", data);

      if (data.roomId === roomId) {
        setMessages((prev) =>[
          ...prev,
          { sender: data.sender, text: data.text },
        ]);
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [roomId]);

  // toggle for hamburger button
  const sidebar = document.querySelector(".sidebar");
  const toggleClass = () => {
    sidebar?.classList.toggle("open");
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    const chatBox = document.getElementById("chatBox");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <div className="containerbody d-flex row flex-wrap mt-5">
        <div className="hamburger-menu">
          <button
            className="hamburger-button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarnav"
            onClick={() => toggleClass()}
          >
            &#9776;
          </button>
        </div>
        <section className="sidebar offcanvas offcanvas-start" id="sidebarnav">
          <h2 className="friends offcanvas-title">Friends!</h2>

          {/* Left Column - Users */}
          <div className="offcanvas-body">
            <section className="">
              {/* <h4>Users</h4> */}
              {decodedUserToken &&
                users &&
                users
                  .filter((user) => user.username !== currentUser)
                  .map((user) => (
                    <div className="d-flex p-1" key={user.id} data-id={user.id}>
                      <div>
                        <ul
                          className="userFriends"
                          onClick={
                            () => {
                              user.id &&
                                user.username &&
                                getUser(user.id, user.username);
                            }
                            // getMessages(chatRoomId)
                          }
                        >
                          <li>{user.username}</li>
                        </ul>
                      </div>
                    </div>
                  ))}
            </section>
          </div>
        </section>
        {/* Right Column - Chatroom */}
        {recipientID !== 0 ? (
          <section className="chat">
            <header className="card-header text-center">
              Chatroom with {recipientName}
            </header>
            <main
              className="card-body chat-box overflow-auto"
              id="chatBox"
              style={{ height: "400px", overflowY: "auto" }}
            >
              {/* Chat messages go here */}
              {/* {showMessages.map((msg, index) => (
                
              ))} */}
              {messages.map((msg, index) => (
                <div className="w-100 mb-2" key={index}>
                  <div className="d-flex flex-column">
                    <span className="text-muted small text-start">
                      {msg.sender}
                    </span>
                    <div>
                      <div
                        className={`message p-2 rounded-3 ${
                          msg.sender === currentUser
                            ? "bg-success text-white"
                            : "bg-light text-dark"
                        }`}
                        style={{ maxWidth: "70%" }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
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
                <button
                  className="custmbutton btn-primary"
                  onClick={sendMessage}
                >
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
        <section className="statusbar">{currentUser}</section>
      </div>

      <footer className="foot text-center mt-5">
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