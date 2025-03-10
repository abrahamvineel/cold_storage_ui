import logo from './cold_storage.png';
import './App.css';
import Login from './components/Login';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import HomePage from './components/HomePage';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Cold Storage
        </h1>
        <div>
          <button onClick={() => navigate("/login")}>Go to Login</button>
          <button onClick={() => navigate("/signup")}>Go to Signup</button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/homepage" element={<HomePage />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
