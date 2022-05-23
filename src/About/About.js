import 'Home/App.css';
import React from 'react';
import store from 'redux/store';
import { Provider } from 'react-redux';
import AboutComponent from 'About/AboutComponent';
import Navbar from 'Navbar/Navbar';
import { menuSelected } from "redux/actions";
import navBarStore from 'redux/navBarStore';
import Footer from 'footer/Footer';

function About() {
    let className = ["nav-links", "nav-links-clicked", "nav-links"];
    navBarStore.dispatch(menuSelected(className, 1, "about"));

    return (
        <div>
            <Provider store={navBarStore}>
                <Navbar/>
            </Provider>
            <div className="App">
                <Provider store={store}>
                    <div className="row">
                        <div className="column left">
                            <AboutComponent/>
                        </div>
                        <div className="column right">
                            {/* <UserBox/> */}
                        </div>
                    </div>
                </Provider>
            </div>
            <Footer/>
        </div>
      );
}

export default About;