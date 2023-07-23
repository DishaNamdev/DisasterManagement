import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";


const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('username', username)
    console.log('password', password)

    axios
      .post("http://localhost:8080/api/v1/safesync/secure/login", {
        userName: username,
        password: password,
      })
      .then((response) => {
        console.log('response', response)
        setCurrentUser(response.data);
        navigate("/home")
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
      
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="username" />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
          <button type="submit" >Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
