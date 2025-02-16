import React, {useEffect, useState} from 'react';

import type { UserData } from "../interfaces/UserData";
import io from 'socket.io-client';

const socket = io('http://localhost:3001');


// Define the props for the component
interface UserListProps {
    users: UserData[] | null; // users can be an array of UserData objects or null
}

const UserList: React.FC<UserListProps> = ({ users }) => {

    const [room,setRoom] = useState("");
    const [message,setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    const joinRoom = () => {if (room !== "") {socket.emit("join_room",room)}}

    const sendMessage = () => socket.emit("send_message",{message,room});

    useEffect(() => {
        socket.on("receive_message",(data)=>{setMessageReceived(data.message)})
    })

    return (
        <>
            <h2 className="pb-5">
                Check out all your friends!
            </h2>
            {users && users.map((user) => (
                <div className="row align-center mb-5" key={user.id}>
                    <div className="col-md-6">
                        <h3>{user.id}. {user.username}</h3>
                    </div>
                    <div className="col-md-6">
                        <h4><a href={`mailto:${user.email}`}>{user.email}</a></h4>
                    </div>
                </div>
            ))}
        </>
    );
};

export default UserList;
