import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'; 
import { AppWrapper, GlassContainer } from '../Components/Styled-Component'; 
import SignupForm from './SignupForm';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height:300px;
  width:300px;


  @media (max-width: 380px) {
    width: 250px;
    
  }
  @media (max-width: 305px) {
    width: 230px;
    
  }
  @media (max-width: 289px) {
    width: 190px;
    
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


function LoginForm() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Error, setError] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError('');
    setpasswordError('');
    setSuccessMessage('');
    setError('');

    if (!email) {
      setEmailError('Please enter an email address.');
      return;
    }
    if (!password || password < 5) {
      setpasswordError('Please enter correct password.')
    }
    try {
      const response = await axios.post('http://192.168.0.109:8000/api/auth/login', {

        email: email,
        password: password,
      });

     
      if (response.data.success) {
       

        setemail('');
        setpassword('');
        setSuccessMessage('Login successful. You can now log in.');
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
        console.log('Signup successful');
      } else {
       

        console.log('Signup failed:', response.data.errors);
      }
    } catch (error) {
     
      setError('Enter right credentials.')
      console.error('Error:', error.message);
    }
  };

  return (
    <>
    <AppWrapper>
      <GlassContainer>
        
      <h2 className='Login-text'>Login <FontAwesomeIcon icon="user" size="1x" style={{ color: 'white' }} /> </h2>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {Error && <ErrorMessage>{Error}</ErrorMessage>}

      {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
      {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

      <Form className='Form' onSubmit={handleSubmit}>

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
        <Button type="submit">Login</Button>
        <div>
          <p style={{ color: 'white', marginBlock: '20px' }}>
            Do you already have an account? <a style={{
              textDecoration: 'none', color: "#000066", fontWeight: '400',cursor:"pointer"
            }} href={SignupForm}>Sign up</a>
          </p>
        </div>

      </Form>
      </GlassContainer>
     </AppWrapper>
   

    </>
  );
}

export default LoginForm;
