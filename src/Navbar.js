import React, { Component } from "react";
import { MenuItems } from './MenuItems';
import './css/Navbar.css';
import { Link, Navigate, Redirect } from 'react-router-dom';
import { searchAction, menuSelected } from './redux/actions';
import userMenuStore from "./redux/userMenuStore.js";
import { connect, Provider } from 'react-redux';
import burgerMenu from './icons/burger-menu.png'
import close from './icons/close-black.png'
import grapeLogo from './icons/grape.png';
import Dropdown from "./Dropdown";
import cross from './icons/remove.png';
import { Button } from "@material-ui/core";
import UserBoxComponent from "./UserBoxComponent";
import store from "./redux/store";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          redirect: false,
          clicked: false,
          searchInput: "",
          links: ["/", "profile", "about", "contact-us"],
          items: [
            {
              id: 1,
              value: 'Disconnect',
              icon: cross,
              onClick: this.disconnect.bind(this),
            },
          ],
        }
      }
    
    componentDidMount() {
    }

    componentDidUpdate() {
    }

    inputChangeHandler(event) {
        this.setState({ searchInput: event.target.value });
    }

    handleKeyPress(event) {
    if (event.key === 'Enter') {
        if (this.state.searchInput !== ""){
            this.props.searchAction(this.state.searchInput);
            this.setState({ redirect: true });
            }
        }
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }


    disconnect = () => {
        console.log("pressed");
    }

    render() {
        if (this.state.redirect) {
            this.setState({ redirect: false });
            return <Navigate to="/search" />
        }

        return (
            <nav className="NavbarItems">
                <Link to={"/"} style={{ textDecoration: 'none' }}>
                    <div className="logo-container">
                            <img src={grapeLogo} className="navbar-logo"/>
                            <h1 className="navbar-title">
                                GrapeVyn
                            </h1>
                    </div>
                </Link>
                <div className="menu-icon" onClick={this.handleClick}>
                    <img className="bars" src={this.state.clicked ? close : burgerMenu}></img>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'} style={{ listStyleType: "none", listStylePosition: "inside", paddingLeft: '0px'}}>
                    <li>
                    <div className="searchbar-container">
                        <input
                            placeholder="Search GrapeVyn"
                            className='searchbar-input'
                            value={this.state.searchInput}
                            onChange={(event) => this.inputChangeHandler(event)}
                            onKeyUp={(event) => this.handleKeyPress(event)}
                            />
                    </div>
                    </li>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                    <Link to={item.url} className={this.props.state.userMenuReducer.className[index]}>
                                        <img src={item.image} className="icons"/>
                                        {item.title}
                                    </Link>
                            </li>
                        )
                    })}
                    <div className="UserButtonShrunkDisplay">
                        <Provider store={store}>
                            <UserBoxComponent/>
                        </Provider>
                    </div>
                </ul>
                <div className="UserButton">
                    <Provider store={store}>
                        <UserBoxComponent/>
                    </Provider>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            searchReducer: state.searchReducer,
            userMenuReducer: state.userMenuReducer,
        }
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        searchAction: (searchInput) => dispatch(searchAction(searchInput)),
    //   menuSelected: (className, index, page) => dispatch(menuSelected(className, index, page)),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Navbar);