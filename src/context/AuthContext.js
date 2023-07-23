import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
      const [currentUser, setCurrentUser] = useState({});

      return (
        <AuthContext.Provider value={{ currentUser , setCurrentUser }}>
          {children}
        </AuthContext.Provider>
      );
    };

export default AuthContext;
export { AuthContextProvider };