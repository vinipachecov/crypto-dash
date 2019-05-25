import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';


export const ConfirmButtonStyled = styled.div`
  margin: 20px;
  color: green;
  cursor: pointer;
`

export const CenterDiv = styled.div`
display: grid;
justfiy-content: center;
`

export default function() {
  return (
    <AppContext.Consumer>
      {({confirmFavorites}) => 
      <CenterDiv>
        <ConfirmButtonStyled 
          onClick={confirmFavorites }
        >
          Confirm Favorites
        </ConfirmButtonStyled>
      </CenterDiv>
      }
    </AppContext.Consumer>
  )
}