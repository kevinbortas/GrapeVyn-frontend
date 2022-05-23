import 'Home/App.css';
import React from 'react';
import { Provider } from 'react-redux';
import SearchContainer from 'Search/SearchContainer';
import Navbar from 'Navbar/Navbar';
import navBarStore from 'redux/navBarStore';
import Footer from 'footer/Footer';

function Search() {
    return (
      <div>
          <Provider store={navBarStore}>
            <Navbar/>
          </Provider>
        <div className="App">
            <Provider store={navBarStore}>
                <SearchContainer/>
            </Provider>
        </div>
          <Footer/>
      </div>
      );
}

export default Search;