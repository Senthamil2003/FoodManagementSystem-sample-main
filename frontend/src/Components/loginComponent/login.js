import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import './login.css';
import Button from "react-bootstrap/Button";
import clgPhoto from './RMKEC.jpg';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  function validateForm() {
    return name.length > 0 && password.length > 0;
  }
  function handleSubmit(event) { 
    if(name!=="admin" && password!=="selva"){
      alert("Please! Enter valid credentials");
      let name=document.getElementById('name').value;
      name.value="";

    }else if(name!=="admin"){
      alert("Please! Enter valid username");
      let name=document.getElementById('name').value;
      name.value="";
      event.preventDefault();
    }
    else if(password!=="selva"){
      alert("Please! Enter valid password")
      let pwd=document.getElementById('pwd').value;
      pwd.value="";
      event.preventDefault();
    }
    else {
      navigate('/stock');
    }
    event.preventDefault();
  }

  return (
    <div className="main">
      <div className="Logo">
        <img src={clgPhoto} alt="Logo" />;
      </div>
    <div className="Login">
          <div className="innerlogo">
            <img src={logo} alt="logo" />
          </div>
          <div className="box">
      <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              id="name"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="pwd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        <div className='button'>
         <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
      </div>  
        </Form>
      </div>
    </div>
</div>
  );

}