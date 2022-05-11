import { Avatar } from "@material-ui/core";
import avatar from './apple.png';
import React, { useEffect, useState } from 'react';
import { getCurrentBlock, getOwnerByIndex } from './Web3Client';
import "./css/Post.css";

class Refresh extends React.Component {
    constructor(props) {
        super(props);
    }
  
    componentDidMount() {
    }

    componentDidUpdate() {
    }
  
    render() {
      return (
        <div>
        </div>  
      );
    }
}

export default Refresh