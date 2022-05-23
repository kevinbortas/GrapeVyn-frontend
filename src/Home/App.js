import 'Home/App.css';
import React from 'react';
import MainFeed from 'Home/Main/MainFeedComponent';
import MintBox from 'Home/Main/MintBoxComponent';
import store from 'redux/store';
import { Provider } from 'react-redux';
import { menuSelected } from 'redux/actions.js';
import Navbar from 'Navbar/Navbar';
import navBarStore from 'redux/navBarStore';
import Footer from 'footer/Footer';

function App() {
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
