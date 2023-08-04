import './App.css';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import { BrowserRouter as Router, Switch, Route, Link, RouterProvider,Routes } from 'react-router-dom';
import React, { useState } from 'react';




function App() {
  const [currentPage, setCurrentPage] = useState(null);

  const handleLoginClick = () => {
    setCurrentPage('login');
  };

  const handleSignupClick = () => {
    setCurrentPage('signup');
  };
  return (
    <>
   <div className="App">
      <button className="signup-button" onClick={handleLoginClick}>Login</button>
      <button className="signin-button" onClick={handleSignupClick}>Signup</button>

      {currentPage === 'login' && <LoginForm />}
      {currentPage === 'signup' && <SignupForm />}
    </div>
   
    </>
    );
}

export default App;
