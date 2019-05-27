import React from 'react';
import _ from 'lodash';
import * as cc from 'cryptocompare';
export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'settings',
      favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
      ...this.savedSettings(),
      setPage: this.setPage,      
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites
    }
  }

  componentDidMount() {
    this.fetchCoins();
  }

  fetchCoins = async () => {
    const coinList = (await cc.coinList()).Data;
    this.setState({ coinList});    
  }

  addCoin = key => {
    let favorites = [...this.state.favorites];
    if(favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({favorites})
    }
  }

  removeCoin = key => {
    const favorites = [...this.state.favorites];
    this.setState({
      favorites: _.pull(favorites, key)
    })
  }

  /**
   * Load data from localstorage that has 
   * the user preferences
   */
  savedSettings() {
    const cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if (!cryptoDashData) {
      return { page: 'settings', firstVisit: true };      
    }
    const { favorites } = cryptoDashData;
    return { favorites };    
  }

  confirmFavorites = () => {
    this.setState({
      firsVisit: false,
      page: 'dashboard'
    });
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: this.state.favorites
    }))    
  }

  isInFavorites = key => _.includes(this.state.favorites, key)

  setPage = page => this.setState({page})


  render() {
    return (
      <AppContext.Provider value={this.state}>
      {this.props.children}
      </AppContext.Provider>
    )
  }
}