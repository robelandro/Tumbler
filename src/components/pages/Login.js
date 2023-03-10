import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
// import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [,setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        phone,
        password
      })
    })
      .then(response => {
        if (response.status === 200)
          return response.json();
        else{
          alert("Invalid credentials");
        }
      })
      .then(data => {
        setCookie("token", data.token, { path: "/" });
        if (data.token)
          navigate("/");
      })
      .catch(err => {
        console.error(err)});
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="#">Forgot password?</Link>
      </div>
      <div className="register">
        <span>Don't have an account?</span>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
