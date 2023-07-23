import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
 
  const navigate = useNavigate();
  const handleLogout = () =>{
    navigate("/login");
  }

  return (
    <div className='navbar'>
      <span className="logo">SafeSync</span>
      <div className="user">
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar;