import { Avatar, Button } from "@material-ui/core";
import React from 'react';
import cross from 'icons/remove.png';
import home from 'icons/home.png';
import { connect } from 'react-redux';
import { storeAddress } from "redux/actions";
import { reverseLookUp } from 'Web3/Web3Client';
import "User/UserBox.css";
import { Navigate } from "react-router-dom";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { setUpAccount } from "Web3/ImmuSDKClient.mjs";
import Dropdown from "User/Dropdown/Dropdown";
import chevron from 'icons/down-arrow.png';
import { shortenAddress } from "Helper/helper";

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: this.props.state.isConnected,
            walletAddress: this.props.state.address,
            redirect: false,
            ens: "",
            items: [
                {
                    id: 0,
                    value: 'Profile',
                    icon: home,
                    onClick: this.goToProfile.bind(this),
                    isOpen: false,
                },
                {
                    id: 1,
                    value: 'Disconnect',
                    icon: cross,
                    onClick: this.disconnect.bind(this),
                    isOpen: false,
                },
              ],
        }

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
  
    componentDidMount() {
        this.getEns();
        document.addEventListener("mousedown", this.handleClickOutside);
        window.addEventListener('storage', this.disconnect.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
        window.removeEventListener('storage', this.disconnect.bind(this));
    }    

    componentDidUpdate() {}

    goToProfile() {
        this.setState({ redirect: true });
    }

    open = () => {
        this.setState({ isOpen: !this.state.isOpen})
    }

    connect() {
        setUpAccount().then((address) => {
            if (address){
                this.props.storeAddress(address, true);
            }
        });
    }

    disconnect() {
        this.props.storeAddress(null, false);
        localStorage.removeItem('WALLET_ADDRESS');
        localStorage.removeItem('STARK_PUBLIC_KEY');
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({ isOpen: false })
        }
    }

    getEns() {
        reverseLookUp(this.state.address)
        .then((resultEns) => {
            if (resultEns){
                this.setState({ ens: resultEns })
            }
        });
    }

    render() {
        if (this.state.redirect) {
            this.setState({ redirect: false });
            return <Navigate to="/profile" />
        }

      return (
          <div>
              {!this.props.state.isConnected
                ? 
                <div className="ConnectButtonsContainer">
                    <Button onClick={() => this.connect()} className="ConnectButton">
                        Connect Wallet
                    </Button>
                    <Button onClick={() => this.connect()} className="ResizeConnectButton">
                        Connect
                    </Button>
                </div>
                : 
                <div className="UserBox" ref={this.wrapperRef}>
                    <div className="AccountComponent" onClick={() => this.open()}>
                        <div className="AvatarElement">
                            {this.props.state.isConnected && this.props.state.address != undefined
                            ? <Jazzicon diameter={35} seed={jsNumberForAddress(this.props.state.address)} />
                            : <Avatar/>
                            }
                        </div>
                        <div className="UserInformation">
                            <h2>
                            {this.props.state.isConnected 
                            ? this.state.ens ? this.state.ens : "Unknown"
                            : "Not connected"}
                            </h2>
                            <h3>{shortenAddress(this.props.state.address)}</h3>
                        </div>
                        {this.state.isOpen
                        ? <img src={chevron} style={{transform: 'rotate(180deg)', transition: 'transform 150ms ease'}} className="Chevron"/>
                        : <img src={chevron} className="Chevron"/>
                        }
                    </div>
                    {this.state.isOpen
                    ? <Dropdown items={this.state.items}/>
                    : null
                    }
                </div>
            }
        </div>
      );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            address: state.address,
            isConnected: state.isConnected
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeAddress: (address, isConnected) => dispatch(storeAddress(address, isConnected)),
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);