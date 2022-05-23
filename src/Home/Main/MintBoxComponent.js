import { Button } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { connect } from 'react-redux';
import "Home/Main/MintBox.css";
import { mintToken } from "APIController/APIHandler";
import ProgressBar from "Dynamic/ProgressBar";

function MintBox(props) {

    const [errorMessage, setErrorMessage] = useState("");
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
        .then(response => {
          if(response.data.errorMessage){
            setErrorMessage(response.data.errorMessage)
            setLoading(0);
          }
          else {
            setErrorMessage("");
            setMinted(true);
            setMintData("");
            setLoading(100);
          }
        }).catch(err => {
          console.log("ERROR", err);
          setLoading(0);
        });
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
            {
              errorMessage && props.state.isConnected
              ? <p className="PostError">{errorMessage}</p>
              : null
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