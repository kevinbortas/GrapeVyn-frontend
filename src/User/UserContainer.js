import 'Home/App.css';
import React from 'react';
import store from 'redux/store';
import { connect, Provider } from 'react-redux';
import AccountBox from 'Account/AccountBoxComponent';
import AccountBlocks from 'Account/AccountBlocksComponent';
import { Navigate, useParams } from 'react-router-dom';

function UserContainer(props) {
    const { id } = useParams()
    let address = id;

    if (props.state.address === address){
        return <Navigate to="/profile"/>;
    }

  return (
    <div>
        <Provider store={store}>
                <AccountBox user={address}/>
                <AccountBlocks user={address}/>
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
