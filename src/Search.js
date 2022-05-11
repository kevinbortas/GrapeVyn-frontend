import './css/App.css';
import React from 'react';
import MintBox from './MintBoxComponent';
import UserBox from './UserBoxComponent';
import store from './redux/store';
import searchStore from './redux/searchStore';
import { Provider } from 'react-redux';
import SearchContainer from './SearchContainer';
import SearchResults from './SearchResultsComponent';
import Navbar from './Navbar';
import navBarStore from './redux/navBarStore';
import Footer from './footer/Footer';

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
        {/* <div className='FooterHolderSearch'> */}
          <Footer/>
        {/* </div> */}
      </div>
      );
}

export default Search;