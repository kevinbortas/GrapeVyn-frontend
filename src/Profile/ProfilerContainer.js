import 'Home/App.css';
import React, { useEffect, useState } from 'react';
import store from 'redux/store';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AccountBox from 'Account/AccountBoxComponent';
import AccountBlocks from 'Account/AccountBlocksComponent';

function ProfileContainer(props) {

    if (props.state.address === null || props.state.address === undefined){
        return <Navigate to="/"/>;
    }

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