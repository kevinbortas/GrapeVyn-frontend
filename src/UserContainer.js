import logo from './logo.svg';
import './css/App.css';
import React, { useEffect, useState } from 'react';
import MainFeed from './MainFeedComponent';
import MintBox from './MintBoxComponent';
import UserBox from './UserBoxComponent';
import store from './redux/store';
import searchStore from './redux/searchStore';
import { connect, Provider } from 'react-redux';
import { menuSelected } from './redux/actions.js';
import userMenuStore from './redux/userMenuStore';
import Loading from './LoadingComponent';
import mintNFT from './ImmuSDKClient.mjs';
import Navbar from './Navbar';
import navBarStore from './redux/navBarStore';
import Footer from './footer/Footer';
import AccountBox from './AccountBoxComponent';
import AccountBlocks from './AccountBlocksComponent';
import { Navigate, useParams } from 'react-router-dom';

function UserContainer(props) {
    const { id } = useParams()

    if (props.state.address === id){
        return <Navigate to="/profile"/>;
    }

  return (
    <div>
        <Provider store={store}>
                <AccountBox user={id} />
                <AccountBlocks user={id} />
          </Provider>
    </div>
  );
}

function mapStateToProps(state) {
    return {
        state: {
            address: state.address,
            isConnected: state.isConnected
        }
    }
}

export default connect(mapStateToProps)(UserContainer);
