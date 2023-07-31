import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



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
  color: #4158d0;
  font-weight: bold;
  cursor: pointer;
  margin-top:20px
`;




function LoginForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
  };
 
  return (
    <>
{/* <FontAwesomeIcon icon="user" size="2x" style={{color:'white'}} /> Increase the size of the icon */}
      <h2 className='Login-text'>Login <FontAwesomeIcon icon="user" size="1x" style={{color:'white'}} /> </h2>


    <Form className='Form' onSubmit={handleSubmit}>
    
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button type="submit">Login</Button>
      <div>
      <p style={{color:'white',marginBlock:'20px'}}>
        Do you already have an account? <a  style={{
          textDecoration:'none',color:"#000066",fontWeight:'400',}} href="/signup">Sign up</a>
      </p>
    </div>
    
    </Form>
  
    </>
  );
}

export default LoginForm;
