import './css/App.css';
import React, { useEffect, useState } from 'react';
import MintBox from './MintBoxComponent';
import UserBox from './UserBoxComponent';
import store from './redux/store';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AccountBox from './AccountBoxComponent';
import AccountBlocks from './AccountBlocksComponent';
import searchStore from './redux/searchStore';
import userMenuStore from './redux/userMenuStore';
import Navbar from './Navbar';
import navBarStore from './redux/navBarStore';

function ProfileContainer(props) {

    if (props.state.address === null || props.state.address === undefined){
        return <Navigate to="/"/>;
    }

    // useEffect(() => {
    // }, [])

    return (
        <div>
          <Provider store={store}>
                <AccountBox/>
                <AccountBlocks/>
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

export default connect(mapStateToProps)(ProfileContainer);
// export default ProfileContainer;