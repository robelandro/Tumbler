import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import OrderForm from './components/pages/OrderForm';
import Skill from './components/pages/Skill';
import ChatList from './components/pages/ChatList';
import ChatSpace from './components/pages/ChatSpace';
import Profile from './components/pages/Profile';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

function App() {
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
            <Route path="/chat" element={<ChatSpace/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
