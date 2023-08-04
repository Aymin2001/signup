
import styled, { keyframes } from 'styled-components';

const lightningStrike = keyframes`
  0%, 100% {
    opacity: 0;
  }
  25%, 75% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;
const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #c850c0, #4158d0);
`;



const GlassContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(255,0,0,0.6);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid #ccc; /* Transparent border to create space for the lightning effect */
    border-radius: 10px;
    box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0.8);
    animation: ${lightningStrike} 3s infinite;
    pointer-events: none;
    top: 0;
    left: 0;
  }
`;

export { AppWrapper, GlassContainer };
