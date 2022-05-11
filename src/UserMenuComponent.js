import { Avatar, Button } from "@material-ui/core";
import avatar from './apple.png';
import React from 'react';
import check from './icons/check.png';
import home from './icons/home.png'
import profile from './icons/account.png';
import info from './icons/info.png';
import bell from './icons/bell.png';
import gear from './icons/settings.png';
import { connect } from 'react-redux';
import { storeAddress } from "./redux/actions";
import { init, ifWalletConnected } from './Web3Client';
import "./css/UserBox.css";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { menuSelected } from "./redux/actions";

class UserMenu extends React.Component {
    state = {
        className: ["MenuButtonConnected", "MenuButton", "MenuButton"],
        indexSelected: 0,
    }
  
    componentDidMount() {
    }

    componentDidUpdate() {
    }

    menuButtonClicked(index) {
        let className = ["MenuButton", "MenuButton", "MenuButton"]
        className[index] = "MenuButtonConnected"
        switch(index){
            case 0:
                this.props.menuSelected(className, index, "");
                break;
            case 1:
                this.props.menuSelected(className, index, "profile");
                break;
            case 2:
                this.props.menuSelected(className, index, "about");
                break;
        }
        this.setState({ className: className, indexSelected: index });
    }

  
    render() {

      return (
          <div>
            <div className="MenuComponent">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button className={this.props.state.className[0]} onClick={() => this.menuButtonClicked(0)}>
                        <img src={home} className="Icon"/>
                        Home
                    </Button>
                </Link>
                <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <Button className={this.props.state.className[1]} onClick={() => this.menuButtonClicked(1)}>
                        <img src={profile} className="Icon"/>
                        Profile
                    </Button>
                </Link>
                <Link to="/about" style={{ textDecoration: 'none' }}>
                    <Button className={this.props.state.className[2]} onClick={() => this.menuButtonClicked(2)}>
                        <img src={info} className="Icon"/>
                        About
                    </Button>
                </Link>
            </div>
        </div>
      );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            className: state.className,
            indexSelected: state.indexSelected,
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        menuSelected: (className, index, page) => dispatch(menuSelected(className, index, page)),
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);