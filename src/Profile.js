import './css/App.css';
import React from 'react';
import MintBox from './MintBoxComponent';
import UserBox from './UserBoxComponent';
import store from './redux/store';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AccountBox from './AccountBoxComponent';
import AccountBlocks from './AccountBlocksComponent';
import ProfileContainer from './ProfilerContainer';
import userMenuStore from './redux/userMenuStore';
import { menuSelected } from "./redux/actions";
import navBarStore from './redux/navBarStore';
import Navbar from './Navbar';
import Footer from './footer/Footer';

function Profile() {

  let className = ["nav-links", "nav-links", "nav-links"];
  navBarStore.dispatch(menuSelected(className, 4, ""));

    return (
      <div>
          <Provider store={navBarStore}>
            <Navbar/>
          </Provider>
          <div className="App">
            <Provider store={store}>
              <ProfileContainer/>
            </Provider>
          </div>
          <Footer/>
        </div>
      );
}

export default Profile;