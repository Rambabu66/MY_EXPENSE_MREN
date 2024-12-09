import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CredStyles.css";
import { APICALL_URL, handleError, handleSucess } from "../../utils";

const Registers = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = signupInfo;
  const navigate=useNavigate()
  const handleChanges = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copySignInfo = { ...signupInfo };
    copySignInfo[name] = value;
    setSignupInfo(copySignInfo);
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    const {name,email,password}=signupInfo
    if(!name || !email || !password){
      return handleError("name,email and password required")
    }
    try {
      const Url=`${APICALL_URL}/auth/signup`;
      const resp=await fetch(Url,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(signupInfo)
      })
      const result=await resp.json()
      console.log(result);
      const {success,error,message}=result
      if (success) {
        handleSucess(message)
        setTimeout(()=>{
          navigate('/login')
        },1000)
        
        
      } 
      else if(error){
        const details=error?.details[0].message;
        handleError(details)
      }
      else if(!success){
        handleError(message)
      }
      
      setSignupInfo({
        name:'',
        email:'',
        password:""
      })
      
    } catch (error) {
      handleError(error)
    }
  };
  return (
    <>
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="enter your name"
              name="name"
              value={name}
              onChange={handleChanges}
            />
            <input
              type="email"
              placeholder="enter your email"
              name="email"
              value={email}
              onChange={handleChanges}
            />
            <input
              type="password"
              placeholder="enter your password"
              name="password"
              value={password}
              onChange={handleChanges}
            />
            <button>Register</button>
          </form>
          <div className="routing-pages">
            <span>
              You have  an account?
              <Link to="/login" className="underline-remove">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registers;
