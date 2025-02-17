// import React, {useEffect, useState} from 'react';

import type { UserData } from "../interfaces/UserData";
// import io from 'socket.io-client';

// const socket = io('http://localhost:3001');

// Define the props for the component
interface UserListProps {
  users: UserData[] | null; // users can be an array of UserData objects or null
}

function getUserID(event: any) {
  const user = event.target.value;
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  // const [room,setRoom] = useState("");
  // const [message,setMessage] = useState("");
  // const [messageReceived, setMessageReceived] = useState("");

  // const joinRoom = () => {if (room !== "") {socket.emit("join_room",room)}}

  // const sendMessage = () => socket.emit("send_message",{message,room});

  // useEffect(() => {
  //     socket.on("receive_message",(data)=>{setMessageReceived(data.message)})
  // })

    return (
        <>
      <div className="container mt-5">
        <h2 className="pb-5 text-center">Check out all your friends!</h2>
        
        <div className="row">
          {/* Left Column - Users */}
          <div className="col-md-4">
            <section className="card p-3">
              <h4>Users</h4>
              {users && users.map((user) => (
                <div className="d-flex justify-content-start align-items-center mb-3" key={user.id}>
                  <div>
                    <h6>{user.id}. {user.username}</h6>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Right Column - Chatroom */}
          <div className="col-md-8">
            <section className="card">
              <header className="card-header text-center">(Placeholder for who you are chatting with)</header>
              <main className="card-body chat-box overflow-auto" id="chatBox" style={{ height: '400px' }}>
                {/* Chat messages go here */}
                <div className="message mb-3">
                  <strong>User 1:</strong> Hello! (placeholder text)
                </div>
                <div className="message mb-3 text-end">
                  <strong>You:</strong> Hi there! (placeholder text)
                </div>
              </main>
              <footer className="card-footer">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message.."
                  />
                  <button className="btn btn-primary">Send</button>
                </div>
              </footer>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5">
        Created by Mike, Jenny, and Adarsh
      </footer>
    </>
  );
  return (
    <>
      <h2 className="pb-5">Check out all your friends!</h2>
      {users &&
        users.map((user) => (
          <div
            className="row align-center mb-5"
            key={user.id}
            data-id={user.id}
          >
            <div className="col-md-6">
              <h3>
                {user.id}. {user.username}
              </h3>
            </div>
            <div className="col-md-6">
              <h4>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </h4>
            </div>
          </div>
        ))}
    </>
    // <>
    //     <section className='container'>
    //         <section>
    //         <article className='allUsers'>

    //         </article>
    //         </section>
    //         <section className='mainbodyforchatroom'>
    //         <header></header>
    //         <main></main>
    //         <footer></footer>
    //         </section>
    //     </section>
    // </>
  );
};

export default UserList;
