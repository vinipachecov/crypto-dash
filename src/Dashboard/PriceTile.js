import React from 'react';
import styled, { css } from 'styled-components';
import { fontSize3, fontSizeBig} from '../Shared/Styles';
import { SelectableTile} from '../Settings/Tile';
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid';


const JustifyRight = styled.div`
  justify-self: right;
`

const JustifyLeft = styled.div`
  justify-self: left;
`

const ChangePct = styled.div`
  color:green;
  ${props => props.red && css `
    color: red;
  `}
`

function ChangePercent({data}) {
  return (
  <JustifyRight>
    <ChangePct red={data.CHANGEPCT24HOUR < 0}>
    {numberFormat(data.CHANGEPCT24HOUR)}
    </ChangePct>
  </JustifyRight>)
}



const TickerPrice = styled.div`
 ${fontSizeBig}
`

const numberFormat = number => {
  return +(number + '').slice(0, 7);
}

const PriceTileStyled = styled(SelectableTile)`  
  ${props => props.compact && css`
  display: grid;
  ${fontSize3}
  grid-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
  justify-items: right;
    `}
`

function PriceTile({sym, data}) {  
  return (
    <PriceTileStyled>
      <CoinHeaderGridStyled>
        <div> {sym} </div>
        <ChangePercent data={data}/>
      </CoinHeaderGridStyled>
      <TickerPrice>
        ${numberFormat(data.PRICE)}
      </TickerPrice>
    </PriceTileStyled>
  )
}

function PriceTileCompact({sym, data}) {
  return (
    <PriceTileStyled compact>    
      <JustifyLeft> {sym} </JustifyLeft>
      <ChangePercent data={data}/>
    <div>
      ${numberFormat(data.PRICE)}
    </div>
  </PriceTileStyled>
  )
}

export default function({price, index}) {
  const sym = Object.keys(price)[0];
  const data = price[sym]['USD'];
  const TileClass = index < 5 ? PriceTile : PriceTileCompact;
  return (
    <TileClass sym={sym} data={data}> 
    </TileClass>

  )
}