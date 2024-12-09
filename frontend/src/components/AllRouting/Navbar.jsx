import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { handleSucess } from './../../utils';
import './Navbar.css'
const Navbar = () => {
    const [loggedduser, setLoggeduser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggeduser(localStorage.getItem("loggedInUser"));
  }, []);
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSucess("User Logout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <>
      <div className="headers">
        <h1>Welcome : {loggedduser}</h1>
        <button className='nav-button' onClick={handleLogout}>LogOut</button>
      </div>
    </>
  )
}

export default Navbar
