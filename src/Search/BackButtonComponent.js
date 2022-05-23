import { Button } from "@material-ui/core";
import React from 'react';
import { connect } from 'react-redux';
import "User/UserBox.css";
import { Link } from "react-router-dom";
import backArrow from 'icons/left-arrow.png';

class BackButton extends React.Component {
    componentDidMount() {
    }

    componentDidUpdate() {
    }

  
    render() {

      return (
          <div>
            <Link to={`/${this.props.state.page}`} style={{ textDecoration: 'none' }}>
                <Button className="BackButton" disableRipple>
                    <img src={backArrow} alt="my image" className="BackButtonIcon"/>
                </Button>
            </Link>
        </div>
      );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            className: state.className,
            indexSelected: state.indexSelected,
            page: state.page,
        }
    }
}

export default connect(mapStateToProps)(BackButton);