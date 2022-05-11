import './css/App.css';
import React from 'react';
import MintBox from './MintBoxComponent';
import UserBox from './UserBoxComponent';
import store from './redux/store';
import searchStore from './redux/searchStore';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AccountBox from './AccountBoxComponent';
import AccountBlocks from './AccountBlocksComponent';
import ProfileContainer from './ProfilerContainer';
import AboutComponent from './AboutComponent';
import Navbar from './Navbar';
import userMenuStore from './redux/userMenuStore';
import { menuSelected } from "./redux/actions";
import navBarStore from './redux/navBarStore';
import Footer from './footer/Footer';

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
            {/* <div className='FooterHolder'> */}
                <Footer/>
            {/* </div> */}
        </div>
      );
}

export default About;