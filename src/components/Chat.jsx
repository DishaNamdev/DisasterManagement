import React, { useContext,useEffect } from "react";
import Messages from "./Messages";
import Input from "./Input";
// import { ChatContext } from "../context/ChatContext";
import AuthContext from "../context/AuthContext";
import ChatContext from "../context/ChatContext";
import SockJsClient from 'react-stomp';

const Chat = () => {
  const { currentUser } = useContext(AuthContext);
  const { allMessages, setAllMessages } = useContext(ChatContext);
  const SOCKET_URL = "http://localhost:8080/api/v1/agent/instances/" + currentUser.user.id;

  useEffect(() => {
     // Include JWT token as a URL parameter
     const eventSource = new EventSource(SOCKET_URL);

     eventSource.onmessage = (event) => {
       const jsonData = JSON.parse(event.data);
       jsonData.sender = "llm"
       setAllMessages(allMessages.concat(jsonData));
     };
 
     eventSource.onerror = (event) => {
       console.error("EventSource failed:", event);
     };
 
     return () => {
       eventSource.close();
     };
   }, []);

  return (
    <div className="chat">
      <div className="chatInfo">
        {console.log("currentUser", currentUser)}
        {currentUser && (
          <span>{currentUser.user.role + "-" + currentUser.user.id}</span>
        )}
      </div>
  
      <Messages messages = {allMessages}/>
      <Input onSendMessage />
    </div>
  );
};

export default Chat;
