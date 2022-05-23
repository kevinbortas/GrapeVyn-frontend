import React from 'react';
import Post from 'Post/PostComponent';
import 'Home/App.css';
import { getCollectionData, getCollectionDataV2 } from 'APIController/APIHandler';
import { LoadingContentCircle } from 'Dynamic/LoadingComponent';

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
        remainingTokenIds: 0,
        refreshNotifier: "",
        update: false,
        pageSize: 10,
        bottomReached: true,
        remaining: 1,
    }
  
    componentDidMount() {
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

    getCurrentBlock() {
        fetch('https://29o8eqgw21.execute-api.eu-west-1.amazonaws.com/getCurrentId')
        .then(response => {
            return response.json();
        })
        .then(data => {
            let currentBlockId = data.data.TokenId
            this.getPosts(currentBlockId);
            this.setState({ currentBlockId: currentBlockId, update: false, refreshNotifier: "" })
        });
    }

    getPosts(currentTokenId) {
        getCollectionDataV2(this.state.pageSize, currentTokenId)
        .then((returnedTokens) => {
            let currentTokens = this.state.tokens.concat(returnedTokens.tokenArray);
            this.setState({ tokens: currentTokens, bottomReached: false, remainingTokenIds: returnedTokens.currentTokenId });
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
                this.getPosts(this.state.remainingTokenIds);
            }
        }
      }

    checkBlockId() {
        fetch('https://29o8eqgw21.execute-api.eu-west-1.amazonaws.com/getCurrentId')
        .then(response => {
            return response.json();
        })
        .then(data => {
            let returnedBlockId = parseInt((data.data.TokenId));
            if (this.state.currentBlockId < returnedBlockId){
                this.setState({refreshNotifier: `Your GrapeVyn is behind by ${returnedBlockId - this.state.currentBlockId} token(s)`, update: true})
            }
        });
    }

    updateBlock = (event) => {
        event.preventDefault();
        this.setState({ tokens: [], cursor: "", remaining: 1 })
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