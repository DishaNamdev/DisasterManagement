import {
  createContext,
  useState,
} from "react";

export const ChatContext = createContext();
const ChatContextProvider = ({children}) =>{
    const [message, setMessage ] = useState("Hey!!");
    const[responseMssg, setResponseMssg] = useState(null);
    const [allMessages, setAllMessages] = useState([]);
    const [allresponseMeesages, setAllResponseMessages] = useState([]);
    return (
        <ChatContext.Provider value={{message,setMessage, responseMssg, setResponseMssg, allMessages,setAllMessages, allresponseMeesages, setAllResponseMessages}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext;
export {ChatContextProvider};
