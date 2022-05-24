import { Button } from "@material-ui/core";
import React, { useRef, useState, useEffect } from "react";
import { connect } from 'react-redux';
import "Home/Main/MintBox.css";
import { mintToken } from "APIController/APIHandler";
import ProgressBar from "Dynamic/ProgressBar";
import ReCAPTCHA from "react-google-recaptcha";

const MESSAGE_LENGTH = 500;
const SITE_KEY = "6LcfNhYgAAAAAHaUNylg2uLhRK9rW4DpD9frPxbA";

function MintBox(props) {

    const [errorMessage, setErrorMessage] = useState("");
    const [mintData, setMintData] = useState("");
    const [loading, setLoading] = useState(0);
    const [transitionTime, setTransitionTime] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
  
    const mint = (captchaResponse) => {
      if (mintData !== "") {
        setLoading(90);
        setTransitionTime(1);
        mintToken(props.state.address, mintData, captchaResponse)
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
      setIsOpen(false);
      setMintData(value.target.value);
      if (props.state.isConnected) {
        setErrorMessage("");
      }

      if (value.target.value.length > MESSAGE_LENGTH){
        setErrorMessage("Sorry, your post is too long");
      }
    }

    const handleTransitionEnd = () => {
      if (loading == 100){
        setLoading(0);
        setTransitionTime(0);
      }
    };

    const displayCaptcha = () => {
      if (mintData.length > MESSAGE_LENGTH) {
        return
      }
      else {
        setIsOpen(true);
      }
    }

    const captchaClicked = (value) => {
      if (value){
        mint(value);
      }
      setIsOpen(false);
    }

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
            <Button onClick={() => displayCaptcha()} 
              className={"MintBoxButton"}
              disabled={ props.state.isConnected && mintData !== "" ? false : true}
              disableRipple
              >
                  Post
            </Button>
            <p className="PostError">{errorMessage}</p>
          </div>
          {isOpen && 
          <div className="Captcha">
            <ReCAPTCHA
              sitekey={SITE_KEY}
              onChange={captchaClicked}
            />
            </div>
            }
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