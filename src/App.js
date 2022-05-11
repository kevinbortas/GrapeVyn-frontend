import logo from './logo.svg';
import './css/App.css';
import React, { useEffect, useState } from 'react';
import MainFeed from './MainFeedComponent';
import MintBox from './MintBoxComponent';
import UserBox from './UserBoxComponent';
import store from './redux/store';
import searchStore from './redux/searchStore';
import { Provider } from 'react-redux';
import { menuSelected } from './redux/actions.js';
import userMenuStore from './redux/userMenuStore';
import Loading from './LoadingComponent';
import mintNFT from './ImmuSDKClient.mjs';
import Navbar from './Navbar';
import navBarStore from './redux/navBarStore';
import Footer from './footer/Footer';

function App() {
  // const providerUrl = process.env.PROVIDER_URL || 'http://localhost:7545';

  let className = ["nav-links-clicked", "nav-links", "nav-links"];
  navBarStore.dispatch(menuSelected(className, 0, ""));


  return (
    <div>
      <Provider store={navBarStore}>
            <Navbar/>
      </Provider>
      <div className="App">
          <Provider store={store}>
              <MintBox/>
              <MainFeed/>
          </Provider>
      </div>
        <Footer/>
    </div>
  );
}

export default App;
