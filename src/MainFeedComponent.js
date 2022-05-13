import React, { useEffect, useState } from 'react';
import { getAllTokensByIndex, getCurrentBlock } from './Web3Client';
import Post from './PostComponent';
import './css/App.css';
import { getCollectionData, getTokenData } from './APIHandler';
import { LoadingContentCircle } from './LoadingComponent';

const RefreshComponent = ({ refreshNotifier, updateBlock }) => {
    return (
        <div>
            <p>{refreshNotifier}, please <a href='' onClick={(event) => updateBlock(event)}>refresh</a>
            </p>
        </div>
    )
}

class MainFeed extends React.Component {
    state = {
        tokens: [],
        cursor: "",
        currentBlockId: 0,
        refreshNotifier: "",
        update: false,
        pageSize: 20,
        bottomReached: true,
        remaining: 1,
    }
  
    componentDidMount() {
        this.getPosts();
        this.getCurrentBlock();

        this.interval = setInterval(() => this.checkBlockId(), 5000);

        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        clearInterval(this.interval);
    }

    getPosts() {
        getCollectionData(this.state.pageSize, this.state.cursor)
        .then((returnedTokens) => {
            let currentTokens = this.state.tokens.concat(returnedTokens.tokenArray);
            this.setState({ tokens: currentTokens, cursor: returnedTokens.returnedCursor, bottomReached: false, remaining: returnedTokens.remaining });
        })
    }

    refreshPosts() {
        getCollectionData(this.state.pageSize, "")
        .then((returnedTokens) => {
            this.setState({ tokens: returnedTokens.tokenArray, cursor: returnedTokens.returnedCursor, bottomReached: false, remaining: returnedTokens.remaining });
        })
    }

    getCurrentBlock() {
        fetch('https://29o8eqgw21.execute-api.eu-west-1.amazonaws.com/getCurrentId')
        .then(response => {
            return response.json();
        })
        .then(data => {
            let returnedBlockId = parseInt((data.data.rows[0].TokenId));
            this.setState({currentBlockId: returnedBlockId, update: false, refreshNotifier: ""})
        });
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
                this.getPosts();
            }
        }
      }

    checkBlockId() {
        fetch('https://29o8eqgw21.execute-api.eu-west-1.amazonaws.com/getCurrentId')
        .then(response => {
            return response.json();
        })
        .then(data => {
            let returnedBlockId = parseInt((data.data.rows[0].TokenId));
            if (this.state.currentBlockId < returnedBlockId){
                this.setState({refreshNotifier: `Your GrapeVyn is behind by ${returnedBlockId - this.state.currentBlockId} token(s)`, update: true})
            }
        });
    }

    updateBlock = (event) => {
        event.preventDefault();
        this.setState({ tokens: [], cursor: "", remaining: 1 })
        this.refreshPosts();
        this.getCurrentBlock();
    }
  
    render() {
        return (
            <div>
                {this.state.update
                ? <RefreshComponent refreshNotifier={this.state.refreshNotifier} updateBlock={this.updateBlock.bind(this)}/>
                : null
                }
                {
                    this.state.tokens.length === 0
                    ? <LoadingContentCircle/>
                    : 
                    <div> 
                    {this.state.tokens.map((item, index) => <Post text={item.message} blockId={item.blockId} timestamp={item.timestamp} owner={item.owner} key={index} selectable={true}/>)}
                    {this.state.bottomReached
                        ? <LoadingContentCircle/>
                        : null
                    }
                    </div>
                }
            </div>
        );
    }
}

export default MainFeed