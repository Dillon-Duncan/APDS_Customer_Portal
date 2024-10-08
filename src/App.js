import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';  // Adjust the import paths as needed
import Register from './components/Register';
import Payment from './components/Payment';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Customer International Payments Portal</h1>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            {/*<li>
              <Link to="/payment">Payment</Link>
            </li>*/}
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/" element={<h2>Welcome! Please log in or register.</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;