import 'Home/App.css';
import React from 'react';
import store from 'redux/store';
import { Provider } from 'react-redux';
import { menuSelected } from 'redux/actions.js';
import Navbar from 'Navbar/Navbar';
import navBarStore from 'redux/navBarStore';
import Footer from 'footer/Footer';
import UserContainer from 'User/UserContainer';

function User() {
  let className = ["nav-links", "nav-links", "nav-links"];
  navBarStore.dispatch(menuSelected(className, 4, ""));

  return (
    <div>
      <Provider store={navBarStore}>
            <Navbar/>
      </Provider>
      <div className="App">
        <Provider store={store}>
            <UserContainer />
          </Provider>
      </div>
        <Footer/>
    </div>
  );
}

export default User;
