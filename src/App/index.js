import React from 'react';
import './App.css';
import WelcomeMessage from '../Settings/WelcomeMessage';
import styled, { css } from 'styled-components';
import AppLayout from './AppLayout';
import AppBar from './AppBar'
import { AppProvider } from './AppProvider';
import Settings from '../Settings';
import Content from '../Shared/Content';
import Dashboard from '../Dashboard';
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
       <AppProvider>
      <AppBar/>
        <Content>
          <Settings />
          <Dashboard />
        </Content>
      </AppProvider>
     </AppLayout>   

  );
}

export default App;
 