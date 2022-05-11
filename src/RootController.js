import App from './App';
import './css/index.css'
import reportWebVitals from './reportWebVitals';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Profile from './Profile';
import Search from './Search';
import About from './About';
import Loading from './LoadingComponent';
import { init } from './Web3Client';
import store from './redux/store';
import { storeAddress } from './redux/actions';
import Contact from './contact-us/Contact';
import User from './User';

function RouteController() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const address = localStorage.getItem('WALLET_ADDRESS');
      if (address !== null){
        store.dispatch(storeAddress(address, true));
      }

      setIsLoaded(true);
    }, 1000)
  }, [])

  return (
    <div>
      {!isLoaded
      ? <Loading/>
      : <BrowserRouter>
              <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/user=:id" element={<User />} />
              </Routes>
          </BrowserRouter>
      }
    </div>
  );
}

export default RouteController;
