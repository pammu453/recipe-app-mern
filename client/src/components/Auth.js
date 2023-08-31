import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

import {useCookies} from "react-cookie";
import {useNavigate} from 'react-router-dom';

const Auth = () => {
  return (
    <div>
      <Register />
      <Login />
    </div>
  )
}

export default Auth;

//REGISTER
const Register = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async(event) => {
     event.preventDefault();
     try {
      await axios.post("http://localhost:4000/auth/register",{
        username,
        password
      });
      alert("Registration completed Login below.")
     } catch (error) {
      console.log(error)
     }
  }
  return (
    <Form
      username={username}
      setUserName={setUserName}
      password={password}
      setPassword={setPassword}
      label={"Register here"}
      onSubmit={onSubmitHandler} />
  )
}

//LOGIN
const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [,setCookies]=useCookies(['access_token']);
  const navigate=useNavigate();
  
  const onSubmitHandler = async(event) => {
    event.preventDefault();
    try {
      const response=await axios.post("http://localhost:4000/auth/login",{
       username,
       password
     });

     setCookies('access_token',response.data.token);
     window.localStorage.setItem('userId',response.data.userId);
     navigate('/');
    } catch (error) {
     console.log(error)
    }
 }
  return (
    <Form
      username={username}
      setUserName={setUserName}
      password={password}
      setPassword={setPassword}
      label={"Login Here"} 
      onSubmit={onSubmitHandler}/>
  )
}

const Form = ({ username, setUserName, password, setPassword, label, onSubmit }) => {
  return (
    <div className="wrapper">
      <h1>{label}</h1>
      <form onSubmit={onSubmit}>
        <label>
          <p>Username</p>
          <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}