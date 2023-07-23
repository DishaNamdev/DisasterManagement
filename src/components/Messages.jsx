import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";

const Messages = () => {
  const {allMessages} = useContext(ChatContext);
  return (

    <div className="messages">
      {allMessages&& allMessages.map((m)=>{
        return <Message key={m.id} message={m.message} sender = {m.sender}/>
      })}
    </div>

  );
};

export default Messages;
