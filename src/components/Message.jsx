import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import usericon from "../img/usericon.png";

const Message = ({id,message,sender}) => {
  const ref = useRef();
  const responseMssg = "Thanks for your input, please wait while we process!!"

  return (
    <>
      <div className="message owner">
        {message && sender !== "llm" &&
            <>
              <div className="messageInfo">
                <img src={usericon} alt="" />
              </div>
              <div className="messageContent">
                <p>{message}</p>
              </div>
            </>
          } 
      </div>
        {message && sender === "llm" &&
        <div className="message">
            <div className="messageInfo">
              <img src={usericon} alt="" />
            </div>
            <div className="messageContent">
              <p>{message}</p>
            </div>
          </div >
        }
      {
        responseMssg && sender !== "llm" &&
          <div className="message">
            <div className="messageInfo">
              <img src={usericon} alt="" />
            </div>
            <div className="messageContent">
              <p>{responseMssg}</p>
            </div>
          </div >
      }
    </>
  );
};

export default Message;
