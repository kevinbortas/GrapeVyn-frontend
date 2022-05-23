import React from 'react';
import "Account/AccountBox.css";
import { connect } from 'react-redux';
import Post from 'Post/PostComponent';
import { LoadingContentCircle } from "Dynamic/LoadingComponent";
import { getOwnedTokens } from "APIController/APIHandler";

class AccountBlocks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ownedTokens: [],
            ownedAddress: "",
            isLoading: true,
            numberOfBlocks: 0,
            address: this.props.user ? this.props.user : this.props.state.address,
            pageSize: 20,
            bottomReached: true,
            remaining: 1,
            cursor: "",
        }
    }
  
    componentDidMount() {
        this.getTokens();

        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    getTokens(){
        if (this.state.address !== null){
            getOwnedTokens(this.state.address, this.state.pageSize, this.state.cursor)
            .then((returnedTokens) => {
                let currentTokens = this.state.ownedTokens.concat(returnedTokens.tokenArray);
                this.setState({ ownedTokens: currentTokens, numberOfBlocks: returnedTokens.length, cursor: returnedTokens.returnedCursor, bottomReached: false, remaining: returnedTokens.remaining, isLoading: false });
            })
            .catch(err => {
                this.setState({ ownedTokens: [], numberOfBlocks: 0, isLoading: false });
            });
        }
    }

    handleScroll = () => {
        let bottomPageOffset = 50;
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - bottomPageOffset && !this.state.bottomReached) {
            if (this.state.remaining === 1){
                this.setState({ bottomReached: true })
                this.getTokens();
            }
        }
      }
  
    render() {
        return (
        <div>
            <div className="AccountBlocks">
                {
                    this.state.isLoading
                    ? <LoadingContentCircle/>
                    : this.state.ownedTokens.length > 0
                        ?
                        <div> 
                        {this.state.ownedTokens.map((item, index) => <Post text={item.message} blockId={item.blockId} timestamp={item.timestamp} owner={item.owner} key={index}/>)}
                        {this.state.bottomReached
                            ? <LoadingContentCircle/>
                            : null
                        }
                        </div>
                        :
                        <h2>No posts yet :(</h2>
                }
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

export default connect(mapStateToProps)(AccountBlocks);