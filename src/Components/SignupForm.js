import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'; // Import the axios library
import { AppWrapper, GlassContainer } from '../Components/Styled-Component'; // Adjust the import path based on the file structure

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height:300px;
  width:300px;

  @media (max-width: 350px) {
    width: 230px;
    
  }
  @media (max-width: 305px) {
    width: 200px;
    
  }
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  outline: none;
  color: #fff;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  color: #c850c0;
  font-weight: bold;
  cursor: pointer;
  margin-top:20px;
  
  
  /* Hover effect */
  &:hover {
    background-color: #c850c0;
    color: #fff;
    border-radius: 15px;
  }
`;
const ErrorMessage = styled.div`
  color: red;
  text-align:center;
`;
const SuccessMessage = styled.div`
  color: green;
  text-align:center;
`;
function SignupForm() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUsernameError('');
    setEmailError('');
    setpasswordError('');
    setSuccessMessage('');
    // Validate username and email
    if (!username) {
      setUsernameError('Please enter a username.');
      return;
    }

    if (!email) {
      setEmailError('Please enter an email address.');
      return;
    }
    if (!password || password < 5) {
      setpasswordError('Please enter correct password.')
    }
    try {
      const response = await axios.post('http://192.168.0.109:8000/api/auth/createuser', {
        username: username,
        email: email,
        password: password,
      });

      // Check the response for success or handle it as needed
      if (response.data.success) {
        // Handle successful signup
        setusername('');
        setemail('');
        setpassword('');
        setSuccessMessage('Signup successful. You can now log in.');
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
        console.log('Signup successful');
      } else {
        // Handle unsuccessful signup with errors
        console.log('Signup failed:', response.data.errors);
      }
    } catch (error) {
      // Handle any network or server errors
      console.error('Error:', error.message);
    }
  };


  return (
    <>
      <AppWrapper>
      <GlassContainer>
      <h2 className="Login-text">
        Signup
        <FontAwesomeIcon icon="user" size="1x" style={{ color: 'white' }} />
      </h2>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {usernameError && <ErrorMessage>{usernameError}</ErrorMessage>}
      {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
      {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
      <Form className="Form" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />


        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />

        <Button type="submit" >Signup</Button>
      </Form>
       
      </GlassContainer>
    </AppWrapper>
   
    </>
  );
}

export default SignupForm;
