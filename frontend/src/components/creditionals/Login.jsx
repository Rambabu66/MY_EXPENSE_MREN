import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { APICALL_URL, handleError, handleSucess } from '../../utils';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const {  email, password } = loginInfo;
  const navigate=useNavigate()
  const handleChanges = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copySignInfo = { ...loginInfo };
    copySignInfo[name] = value;
    setLoginInfo(copySignInfo);
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    const {email,password}=loginInfo;
    if(!email || !password) {
      handleError("email,password are required")
    }
    try {
      const URL=`${APICALL_URL}/auth/login`
      const resp = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result=await resp.json();
      const {success,message,error,name,JwtToken}=result
      if(success){
        handleSucess(message)
        localStorage.setItem('token',JwtToken)
        localStorage.setItem('loggedInUser',name)
        setTimeout(()=>{
          navigate("/home")
        },1000)
      }else if(error){
        const details=error?.details[0].message
        handleError(details)
      }
      else if (!success){
        handleError(message)
      }
      
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
            <button>Login</button>
          </form>
          <div className="routing-pages">
            <span>
              don't have an account?
              <Link to="/signup" className="underline-remove">
                Signup
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login
