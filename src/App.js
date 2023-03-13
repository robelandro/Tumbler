import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { useEffect, useState } from "react";

function App() {
  const [cookies] = useCookies(["token"]); // use useCookies hook
  const [status, setStatus] = useState(true);

  function getUserData(token) {
    return fetch(`http://localhost:5000/get_user/${token}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`User not found. Status code: ${response.status}`);
        }
      });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserData(cookies.token);
        if (cookies.token === undefined) {
          setStatus(false);
        }
        else if (data.id === cookies.token) {
          setStatus(true);
        }
        else {
          setStatus(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [cookies]);
  

return (
  <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          {status ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<ChatSpace />} />
            </>
          ) : (
            <Route path="/" element={<About />} />
          )}
          <Route path="/order" element={<OrderForm />} />
          <Route path="/skill" element={<Skill />} />
          <Route path="/chats" element={<ChatList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  </Router>
);

}

export default App;
