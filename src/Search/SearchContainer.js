import 'Home/App.css';
import React from 'react';
import { connect } from 'react-redux';
import SearchResults from 'Search/SearchResultsComponent';
import { getAddressFromEns } from 'Web3/Web3Client';

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