import React from 'react';
import * as cc from 'cryptocompare';
export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'settings',
      ...this.savedSettings(),
      setPage: this.setPage,      
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

  /**
   * Load data from localstorage that has 
   * the user preferences
   */
  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if (!cryptoDashData) {
      return { page: 'settings', firstVisit: true };      
    }
    return {};    
  }

  confirmFavorites = () => {
    this.setState({
      firsVisit: false,
      page: 'dashboard'
    });
    localStorage.setItem('cryptoDash', JSON.stringify({
      test: 'hello'
    }))
    
  }

  setPage = page => this.setState({page})


  render() {
    return (
      <AppContext.Provider value={this.state}>
      {this.props.children}
      </AppContext.Provider>
    )
  }
}