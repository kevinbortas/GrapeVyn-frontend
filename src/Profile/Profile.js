import 'Home/App.css';
import React from 'react';
import store from 'redux/store';
import { Provider } from 'react-redux';
import ProfileContainer from 'Profile/ProfilerContainer';
import { menuSelected } from "redux/actions";
import navBarStore from 'redux/navBarStore';
import Navbar from 'Navbar/Navbar';
import Footer from 'footer/Footer';

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