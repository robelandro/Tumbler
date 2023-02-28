import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderForm from './OrderForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<OrderForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
