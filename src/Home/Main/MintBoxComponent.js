import { Button } from "@material-ui/core";
import React, { useRef, useState, useEffect } from "react";
import { connect } from 'react-redux';
import "Home/Main/MintBox.css";
import { mintToken } from "APIController/APIHandler";
import ProgressBar from "Dynamic/ProgressBar";

function MintBox(props) {

    const [errorMessage, setErrorMessage] = useState("");
    const [mintData, setMintData] = useState("");
    const [loading, setLoading] = useState(0);
    const [transitionTime, setTransitionTime] = useState(1);
  
    const mint = () => {
      if (mintData !== "") {
        setLoading(90);
        setTransitionTime(1);
        mintToken(props.state.address, mintData)
        .then(response => {
          if(response.data.error){
            setErrorMessage(response.data.error)
            setLoading(0);
          }
          else {
            setErrorMessage("");
            setMintData("");
            setLoading(100);
          }
        }).catch(err => {
          setLoading(0);
        });
      }
    }
  
    const getData = (value) => {
      setMintData(value.target.value);
      if (props.state.isConnected) {
        setErrorMessage("");
      }
    }

    const handleTransitionEnd = () => {
      if (loading == 100){
        setLoading(0);
        setTransitionTime(0);
      }
    };

    useEffect(() => {
      if (!props.state.isConnected) {
        setErrorMessage("Please connect your wallet!");
      }
      else {
        if (errorMessage === "Please connect your wallet!"){
          setErrorMessage("");
        }
      }
    })

    return (
      <div className="MintBox">
        <ProgressBar completed={loading} transitionTime={transitionTime} onTransitionEnd={handleTransitionEnd}/>
          <div className="MintBoxInput">
              <textarea
                  value={mintData}
                  onChange={getData}
                  placeholder="What are you thinking today?"
                  type="text"
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
            <p className="PostError">{errorMessage}</p>
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