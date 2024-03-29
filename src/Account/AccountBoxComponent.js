import React from 'react';
import { reverseLookUp } from 'Web3/Web3Client';
import "Account/AccountBox.css";
import { connect } from 'react-redux';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Tooltip from '@mui/material/Tooltip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { shortenAddress } from "Helper/helper";

class AccountBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address: this.props.user ? this.props.user : this.props.state.address,
            // ens: this.props.ens,
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
        }
    }

    updateDimensions = () => {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    };
  
    componentDidMount() {
        if (!this.state.ens){
            this.getEns()
        }
        window.addEventListener('resize', this.updateDimensions);
    }

    componentDidUpdate() {}

    getEns() {
        reverseLookUp(this.state.address)
        .then((resultEns) => {
            if (resultEns){
                this.setState({ ens: resultEns })
            }
        });
    }
  
    render() {

      return (
        <div className="AccountBox">
            <div className="AccountBoxHeader">
                <div className="UserAvatar">
                    <Jazzicon diameter={this.state.windowWidth > 750 ? 150 : 65} seed={jsNumberForAddress(this.state.address)} />
                </div>
                <div className="User">
                    <div className="UserWalletInformation">
                        <div className="ens">
                        {this.state.ens
                        ?
                            <div className="EnsVerified">
                                <Tooltip title="Reverse ENS Verified">
                                    <CheckCircleIcon style={{ color: '#9c59e4', padding: '0px', fontSize: this.state.windowWidth > 750 ? 40 : 25 }}/>
                                </Tooltip>
                            </div>
                        : null
                        }
                        {this.state.ens
                            ? 
                            <h2>
                                {this.state.ens}
                            </h2>
                            :
                            <h2>
                                Unknown
                            </h2>
                        }
                        </div>
                        <a href={`https://etherscan.io/address/${this.state.address}`} className="AddressLink">
                                {this.state.windowWidth > 400 ? this.state.address : shortenAddress(this.state.address)}
                        </a>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps)(AccountBox);