import 'Home/App.css';
import React from 'react';
import { connect } from 'react-redux';
import SearchResults from 'Search/SearchResultsComponent';
import { getAddressFromEns, checkIfAddressValid } from 'Web3/Web3Client';

class SearchContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        address: "",
        ens: "",
        validAddress: true,
      }
    }

    componentDidMount() {
      if (this.props.state.searchReducer.searchInput.includes(".eth")) {
        this.getByEns()
      }
      else {
            this.checkIfValid(this.props.state.searchReducer.searchInput);
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.state.searchReducer.searchInput !== this.props.state.searchReducer.searchInput) {
        if (this.props.state.searchReducer.searchInput.includes(".eth")) {
            this.getByEns()
        }
        else {
            this.checkIfValid(this.props.state.searchReducer.searchInput);
        }
      }
    }

    getByEns() {
      getAddressFromEns(this.props.state.searchReducer.searchInput)
      .then((resultAddress) => {
        if (resultAddress){
          this.checkIfValid(resultAddress);
          this.setState({ address: resultAddress, ens: this.props.state.searchReducer.searchInput})
        }
        else {
          this.setState({ address: null, ens: null})
        }
      })
    }

    checkIfValid(input) {
        checkIfAddressValid(input)
        .then(result => {
          if (result === true){
            this.setState({ validAddress: result, address: input })
          }
          else {
            this.setState({ validAddress: result, address: input })
          }
        })
    }

    render(){
      return (
          <div>
              {this.state.address
              ? <SearchResults searchInput={this.state.address} ens={this.state.ens} valid={this.state.validAddress}/>
              : <SearchResults searchInput={null} ens={null} valid={null}/>
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