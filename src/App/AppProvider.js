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
      confirmFavorites: this.confirmFavorites,
      setFilteredCoins: this.setFilteredCoins
    }
  }

  componentDidMount() {
    this.fetchCoins();
    this.fetchPrices();
    console.log(this.state);
  }


  fetchCoins = async () => {
    const coinList = (await cc.coinList()).Data;
    this.setState({ coinList});    
  }

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    const prices = await this.prices(); 
    console.log('PRICES', prices);   
    this.setState({prices});
  }

  prices = async () => {
    const returnData = [];
    let priceData = {};
    for (const favorite of this.state.favorites) {
      try {
        priceData = await cc.priceFull(favorite, 'USD');
        returnData.push(priceData);
      } 
      catch(error) {
        console.warn('fetch price error ', error);
      }     
    }
    return returnData;
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
    }, () => {
      this.fetchPrices();
    });
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: this.state.favorites
    }))    
  }

  isInFavorites = key => _.includes(this.state.favorites, key)

  setPage = page => this.setState({page})


  setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins })

  render() {
    return (
      <AppContext.Provider value={this.state}>
      {this.props.children}
      </AppContext.Provider>
    )
  }
}