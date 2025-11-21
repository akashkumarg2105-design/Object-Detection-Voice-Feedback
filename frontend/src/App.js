import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import WhyUs from './pages/WhyUs.js';
import Detector from './pages/Detector.js';
import Navbar from './components/Navbar.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <div className="background-animation"></div>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/why-us" element={<WhyUs />} />
              <Route 
                path="/detector" 
                element={
                  <ProtectedRoute>
                    <Detector />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;