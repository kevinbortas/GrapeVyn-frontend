import './css/App.css';
import React, { useEffect, useState } from 'react';
import searchStore from './redux/searchStore';
import { Provider, connect } from 'react-redux';
import { Navigate, renderMatches } from 'react-router-dom';
import Navbar from './Navbar';
import navBarStore from './redux/navBarStore';
import SearchResults from './SearchResultsComponent';
import { getAddressFromEns } from './Web3Client';

class SearchContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        address: ""
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.state.searchReducer.searchInput !== this.props.state.searchReducer.searchInput) {
        if (this.props.state.searchReducer.searchInput.includes(".eth")) {
            this.getByEns()
        }
        else {
          this.setState({ address: "" })
        }
      }
    }

    getByEns() {
      getAddressFromEns("alex.vandesande.eth")
      .then((resultAddress) => {
        this.setState({ address: resultAddress })
      })
    }

    render(){
      return (
          <div>
              {this.state.address
              ? <SearchResults searchInput={this.state.address}/>
              : <SearchResults searchInput={this.props.state.searchReducer.searchInput}/>
              }
          </div>
        );
    }
}

function mapStateToProps(state) {
  return {
      state: {
          searchReducer: state.searchReducer,
      }
  }
}

export default connect(mapStateToProps)(SearchContainer);