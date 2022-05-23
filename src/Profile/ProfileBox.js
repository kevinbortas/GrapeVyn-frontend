import React from 'react';
import { reverseLookUp } from 'Web3/Web3Client';
import "Profile/ProfileBox.css";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Tooltip from '@mui/material/Tooltip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { shortenAddress } from "Helper/helper";
import { Navigate } from "react-router-dom";

class ProfileBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address: this.props.user,
            redirect: false,
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            ens: "",
        }
    }

    updateDimensions = () => {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    };
  
    componentDidMount() {
        this.getEns()
        window.addEventListener('resize', this.updateDimensions);
    }

    componentDidUpdate() {}

    goToUserProfile() {
        this.setState({ redirect: true });
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
            return <Navigate to={`/user=${this.state.address}`} />
        }

      return (
        <div className="ProfileBox">
            <div className="ProfileBoxHeader">
                <div className="UserAvatar" style={{ cursor: this.props.selectable ? "pointer" : "default"}} onClick={this.props.selectable ? () => {this.goToUserProfile()} : null}>
                    <Jazzicon diameter={this.state.windowWidth > 750 ? 100 : 60} seed={jsNumberForAddress(this.state.address)} />
                </div>
                <div className="User">
                    <div className="UserWalletInformation">
                        <div className="ens">
                        {this.state.ens 
                        ?
                        <Tooltip title="ENS Verified" className="EnsVerified">
                            <CheckCircleIcon style={{ color: '#9c59e4', fontSize: this.state.windowWidth > 750 ? 40 : 25 }}/>
                        </Tooltip>
                        : null}
                        <h2 style={{ cursor: this.props.selectable ? "pointer" : "default"}} onClick={this.props.selectable ? () => {this.goToUserProfile()} : null}>
                            {this.state.ens ? this.state.ens : "Unknown"}
                        </h2>
                        </div>
                        <a href={`https://etherscan.io/address/${this.props.userAddress}`} className="AddressLink">
                                {this.state.windowWidth > 400 ? this.state.address : shortenAddress(this.state.address)}
                        </a>
                    </div>
                </div>
            </div>
        </div>  
      );
    }
}

export default ProfileBox