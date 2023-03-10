import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import OrderForm from "./components/pages/OrderForm";
import Skill from "./components/pages/Skill";
import ChatList from "./components/pages/ChatList";
import ChatSpace from "./components/pages/ChatSpace";
import Profile from "./components/pages/Profile";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies(["token"]); // use useCookies hook
  // const [userStat, setuserStat] = useState([]);
  console.log(cookies.token);
  // useEffect(() => {
  //   fetch(`http://localhost:5000/get_user/${cookies.token}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Do something with the data
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error(error);
  //     });
  // }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/skill" element={<Skill />} />
            <Route path="/chats" element={<ChatList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<ChatSpace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
