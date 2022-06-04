import { Avatar } from "@material-ui/core";
import React from 'react';
import { reverseLookUp } from 'Web3/Web3Client';
import { millisecondsToTime, shortenAddress } from "Helper/helper";
import "Post/Post.css";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { Navigate } from "react-router-dom";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: null,
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

    componentDidUpdate() {
    }

    goToUserProfile() {
        this.setState({ redirect: true });
    }

    getEns() {
        reverseLookUp(this.props.owner)
        .then((resultEns) => {
            if (resultEns){
                this.setState({ ens: resultEns })
            }
        });
    }
  
    render() {
        if (this.state.redirect) {
            this.setState({ redirect: false });
            return <Navigate to={`/user=${this.props.owner}`} />
        }

      return (
        <div className="post">
            <div className="PostHeader">
                <div className="PostAvatar" style={{ cursor: this.props.selectable ? "pointer" : "default"}} onClick={this.props.selectable ? () => {this.goToUserProfile()} : null}>
                    {this.props.owner
                        ? <Jazzicon diameter={40} seed={jsNumberForAddress(this.props.owner)}/>
                        : <Avatar style={{ position: "inherit" }}/>
                    }
                </div>
                <div className="UserName">
                    <div className="ENS">
                        <h2 className="DisplayEns" style={{ cursor: this.props.selectable ? "pointer" : "default"}} onClick={this.props.selectable ? () => {this.goToUserProfile()} : null}>
                            {this.state.ens ? this.state.ens : "Unknown"}
                        </h2>
                        <h2 className="Bullet" style={{ cursor: this.props.selectable ? "pointer" : "default"}} onClick={this.props.selectable ? () => {this.goToUserProfile()} : null}>&bull;</h2>
                        <h2 className="Timestamp" style={{ cursor: this.props.selectable ? "pointer" : "default"}} onClick={this.props.selectable ? () => {this.goToUserProfile()} : null}>{millisecondsToTime(this.props.timestamp)}</h2>
                    </div>
                    <h4 className="WalletAddress">
                    <a href={`https://etherscan.io/address/${this.props.owner}`} className="AddressLookup">
                        { this.state.windowWidth > 400 ? this.props.owner : shortenAddress(this.props.owner) }
                    </a>
                    </h4>
                </div>
            </div>
            <div className="PostBody">
                <div className="Description">
                    <p>{this.props.text}</p>
                </div>
                <div className="PostBlockId">
                    <h3>#{this.props.blockId}</h3>
                </div>
            </div>
        </div>  
      );
    }
}

export default Post