import { Avatar, Button } from "@material-ui/core";
import avatar from './apple.png';
import React, { useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
// import { getOwnedTokens, init, mintToken } from './Web3Client';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './ThemeManager';
import "./css/MintBox.css";
import mintNFT from "./ImmuSDKClient.mjs";
import { mintToken } from "./APIHandler";
import ProgressBar from "./ProgressBar";

function MintBox(props) {
    const [minted, setMinted] = useState(false);
    const [isMintable, setIsMintable] = useState(false);
    const [mintData, setMintData] = useState("");
    const [loading, setLoading] = useState(0);
    const [transitionTime, setTransitionTime] = useState(1);
    const progressBarRef = useRef(null);
  
    const mint = () => {
      if (mintData !== "") {
        setLoading(90);
        setTransitionTime(1);
        mintToken(props.state.address, mintData)
        .then(tx => {
          setMinted(true);
          setMintData("");
          setLoading(100);
        }).catch(err => {
          console.log("ERROR", err);
          setLoading(0);
        });
      }
      else {
        console.log("Please enter a message");
      }
    }
  
    const getData = (value) => {
      setMintData(value.target.value);
    }

    const handleTransitionEnd = () => {
      if (loading == 100){
        setLoading(0);
        setTransitionTime(0);
      }
    };

    return (
      <div className="MintBox">
        <ProgressBar completed={loading} transitionTime={transitionTime} onTransitionEnd={handleTransitionEnd}/>
          <div className="MintBoxInput">
              <textarea
                  value={mintData}
                  onChange={getData}
                  placeholder="What are you thinking today?"
                  type="text"
                  // disabled={!props.state.isConnected}
              />
          </div>
          <div className="PostContainer">
            <Button onClick={() => mint()} 
              className={"MintBoxButton"}
              disabled={ props.state.isConnected && mintData !== "" ? false : true}
              disableRipple
              >
                  Post
            </Button>
            {
              props.state.isConnected
              ? null
              : <p className="PostError">Please connect your wallet!</p>
            }
            </div>
      </div>
    );
}

function mapStateToProps(state) {
  return {
      state: {
          address: state.address,
          isConnected: state.isConnected
      }
  }
}

export default connect(mapStateToProps)(MintBox);