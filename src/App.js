import './App.css';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import React, { useState } from 'react';




function App() {
  const [currentPage, setCurrentPage] = useState(null);

  const handleLoginClick = (event) => {
    event.preventDefault();
    setCurrentPage('login');
  };

  const handleSignupClick = (event) => {
    event.preventDefault();
    setCurrentPage('signup');
  };
  return (
    <>
   <div className="App">
      <button className="signup-button" onClick={handleLoginClick}>Login</button>
      <button className="signin-button" onClick={handleSignupClick}>Signup</button>

      {currentPage === 'login' && (
        <LoginForm onSignupClick={handleSignupClick} /> 
      )}
      {currentPage === 'signup' && <SignupForm />}
    </div>
   
    </>
    );
}

export default App;
