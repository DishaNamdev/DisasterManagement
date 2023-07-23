import React, { useContext, useState } from "react";
import "../stylings/resources.css";
import  AuthContext  from "../context/AuthContext";
import  ChatContext  from "../context/ChatContext";
import axios, { all } from "axios";


const Input = () => {
  const [text, setText] = useState("");

  const { setMessage, setResponseMssg, allMessages, setAllMessages } = useContext(ChatContext);

  const { currentUser } = useContext(AuthContext);

  const sendMessage = (e) =>{
    // call axios here and send the message to the springboot
    console.log(currentUser);
    setMessage(text);
    setText("");
    setResponseMssg("Thanks!! for letting us know. We are working on that");
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+ currentUser.token
    }
    axios.post('http://localhost:8080/api/v1/agent-message/send-message',
    {
      id: currentUser.id,
      location :"India",
      message:text
    }, {
      headers:headers
    }).then(response => {
      // Handle success
      console.log(response.data);
      setMessage(text);
      setAllMessages((prevValue)=>{
        return [...prevValue, {id: currentUser.user.id, message: response.data.message, sender:""}]
      });
      setResponseMssg("Thanks!! for letting us know. We are working on that");
      setText("");
      //  e.target.value = "";
      console.log('allMessages', allMessages)
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });
  }

  const onInputChange = (e) =>{
    setText(e.target.value);
    //e.target.value = "";
  }

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Your Message Here..."
        onChange={(e) => onInputChange(e)}
        value={text}
      />
      <button onClick={sendMessage} className="input-sendbtn">send</button>
    </div>
  );
};

export default Input;
