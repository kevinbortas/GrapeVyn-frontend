import { Button } from '@material-ui/core';
import React from 'react';
import { Provider } from 'react-redux';
import "Search/SearchResults.css";
import Post from 'Post/PostComponent';
import BackButton from 'Search/BackButtonComponent';
import userMenuStore from 'redux/userMenuStore';
import { getOwnedTokens, getTokenById } from "APIController/APIHandler";
import { LoadingContentCircle } from 'Dynamic/LoadingComponent';
import ProfileBox from 'Profile/ProfileBox.js';
import { checkIfAddressValid } from 'Web3/Web3Client';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            className: ["SelectedButton", "SelectorButton", "SelectorButton"],
            indexSelected: 0,
            userAddress: "",
            tokens: [],
            isLoading: true,
            searchInput: this.props.searchInput,
            validAddress: this.props.valid,
            pageSize: 20,
            bottomReached: true,
            remaining: 0,
            cursor: "",
            firstRender: true,
        }
    }
  
    componentDidMount() {
        this.update(this.state.indexSelected);

        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchInput !== this.props.searchInput) {
            this.setState({ searchInput: this.props.searchInput, tokens: [], isLoading: true, remaining: 1, cursor: "", bottomReached: true, userAddress: "", firstRender: true });
            this.update(this.state.indexSelected);
        }
    }

    selectorClicked(index) {
        let classes = ["SelectorButton", "SelectorButton", "SelectorButton"]
        classes[index] = "SelectedButton";
        this.setState({ className: classes, indexSelected: index });
    }

    update(index) {
        if (!this.props.searchInput) {
            this.setState({ tokens: [], isLoading: false, remaining: 1, cursor: "", bottomReached: true, userAddress: "" });
            return;
        }

        if (this.props.valid) {
            this.getByAddress()
        }
        else {
            this.getById()
        }
    }

    getByAddress() {
        if (this.state.bottomReached && !this.state.firstRender){
            getOwnedTokens(this.props.searchInput, this.state.pageSize, this.state.cursor)
            .then((tokens) => {
                if (tokens.tokenArray.length > 0){
                    let currentTokens
                    if (this.state.tokens !== tokens.tokenArray){
                        currentTokens = this.state.tokens.concat(tokens.tokenArray);
                    }
                    else {
                        currentTokens = tokens.tokenArray;
                    }
                    this.setState({ tokens: currentTokens, isLoading: false, cursor: tokens.returnedCursor, remaining: tokens.remaining, bottomReached: false, })
                }
                else { 
                    this.setState({ tokens: [], isLoading: false, bottomReached: true, remaining: 1, cursor: "" });
                }
            })
            .catch(err => {
                this.setState({ tokens: [], isLoading: false, bottomReached: true, remaining: 1, cursor: "" });
            });
        }
        else {
            this.setState({ firstRender: false, bottomReached: true })
        }
    }

    getById() {
        getTokenById(this.props.searchInput)
        .then((token) => {
            token.length > 0
            ? this.setState({tokens: token, isLoading: false, bottomReached: false, remaining: 0 })
            : this.setState({ tokens: [], isLoading: false, bottomReached: true, remaining: 1, cursor: "" });
        })
        .catch(err => {
            this.setState({ tokens: [], isLoading: false, bottomReached: true, remaining: 1, cursor: "" });
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
                this.setState({ bottomReached: true, firstRender: false })
                this.update();
            }
        }
    }

    getUniqueUsers() {
        const uniqueUsers = [];
        if (this.state.tokens.length > 0){
            for (const item of this.state.tokens) {
                if (!uniqueUsers.includes(item.owner)){
                    uniqueUsers.push(item.owner);
                }
            }
        }
        else {
            if (this.props.valid) {
                uniqueUsers.push(this.props.searchInput);
            }
        }

        return uniqueUsers;
    }

    render() {
        return (
            <div>
                <div className="SearchResults">
                    <div className="Selector">
                        <Provider store={userMenuStore}>
                            <BackButton/>
                        </Provider>
                        <Button className={this.state.className[0]} onClick={() => this.selectorClicked(0)} disableRipple>
                            All
                        </Button>
                        <Button className={this.state.className[1]} onClick={() => this.selectorClicked(1)} disableRipple>
                            User
                        </Button>
                        <Button className={this.state.className[2]} onClick={() => this.selectorClicked(2)} disableRipple>
                            Posts
                        </Button>
                    </div>
                </div>
                {
                    !this.props.searchInput
                    ? <h2>No results found</h2>
                    : 
                    this.state.isLoading
                        ? <LoadingContentCircle/>
                        : this.state.indexSelected === 0
                                ? this.state.tokens.length > 0
                                    ? 
                                    <div>
                                        {this.getUniqueUsers().map((item, index) => <ProfileBox key={index} user={item} selectable={true}/>)}
                                        {this.state.tokens.map((item, index) => <Post text={item.message} blockId={item.blockId} timestamp={item.timestamp} owner={item.owner} key={index} selectable={true}/>)}
                                    </div>
                                : this.props.valid
                                    ? 
                                    <div>
                                        {this.getUniqueUsers().map((item, index) => <ProfileBox  key={index} user={item} selectable={true}/>)}
                                    </div>
                                    : <h2>No results found</h2>
                            : this.state.indexSelected === 1
                                ? this.props.valid
                                    ? this.getUniqueUsers().map((item, index) => <ProfileBox  key={index} user={item} selectable={true}/>)
                                    : <h2>Not a valid address</h2>
                                : this.state.indexSelected === 2
                                    ? this.state.tokens.length > 0
                                        ? this.state.tokens.map((item, index) => <Post text={item.message} blockId={item.blockId} timestamp={item.timestamp} owner={item.owner} key={index} selectable={true}/>)
                                        : <h2>No results found</h2>
                                    : <h2>No results found</h2>
                }
                {this.state.bottomReached && !this.state.isLoading && this.state.tokens.length > 0
                    ? <LoadingContentCircle/>
                    : null
                }
            </div>
        );
    }
}

export default SearchResults;