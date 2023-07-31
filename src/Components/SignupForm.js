import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  margin-top:20px
`;

function SignupForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle signup logic here
  };

  return (
    <>
    <h2 className='Login-text'>Signup<FontAwesomeIcon icon="user" size="1x" style={{color:'white'}} /> </h2>

    <Form className='Form' onSubmit={handleSubmit}>
      <Input type="text" placeholder="Username" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="password" placeholder="Re-enter Password" />
      <Button type="submit">Signup</Button>
    </Form>
    </>
  );
}

export default SignupForm;
