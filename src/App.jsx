import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import AppNavbar from './components/AppNavbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import Blogs from './pages/Blogs'

function App() {


   const [isLoggedIn, setIsLoggedIn] = useState(false);
     const token = localStorage.getItem('token');
   
function toggleLogin() {
     setIsLoggedIn(prev => !prev);
  }

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log('Local Storage:', localStorage);
    console.log('Is Logged In:', isLoggedIn);
  }); 


  return (
    <>
      <Router>
        <AppNavbar isLoggedIn={isLoggedIn}/>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login toggleLogin={toggleLogin}/>} />
            <Route path="/logout" element={<Logout toggleLogin={toggleLogin}/>} />
            <Route path="/posts" element={<Blogs />} />
          </Routes>
        </Container>
      </Router>
  
    </>
  )
}

export default App
