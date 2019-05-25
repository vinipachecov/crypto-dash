import React from 'react';
import './App.css';
import WelcomeMessage from './WelcomeMessage';
import styled, { css } from 'styled-components';
import AppLayout from './AppLayout';
const MyButton = styled.button`
  color: green;
  ${props => props.primary && css`
    color: violet;
  `}
`

const TomatoButton = styled(MyButton)`
  color: tomato;
  border-color: tomato;
`

function App() {
  return (   
     <AppLayout>
      <WelcomeMessage />           
     </AppLayout>        
  );
}

export default App;
 