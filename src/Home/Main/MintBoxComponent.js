import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import "Home/Main/MintBox.css";
import { mintToken } from "APIController/APIHandler";
import ProgressBar from "Dynamic/ProgressBar";
import ReCAPTCHA from "react-google-recaptcha";
import Checkbox from '@mui/material/Checkbox';
import TERMS_AND_CONDITIONS from 'docs/GrapeVyn_Terms_and_Conditions.pdf'

const MESSAGE_LENGTH = 500;
const SITE_KEY = "6LcfNhYgAAAAAHaUNylg2uLhRK9rW4DpD9frPxbA";

function MintBox(props) {

    const [errorMessage, setErrorMessage] = useState("");
    const [mintData, setMintData] = useState("");
    const [loading, setLoading] = useState(0);
    const [transitionTime, setTransitionTime] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [isCheckboxOpen, setIsCheckboxOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
  
    const mint = (captchaResponse) => {
      if (isChecked && captchaResponse) {
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
          setIsChecked(false);
        }
      }
      else {
        return
      }
    }
  
    const getData = (value) => {
      setIsOpen(false);
      setIsChecked(false);
      setIsCheckboxOpen(false);
      setMintData(value.target.value);
      if (props.state.isConnected) {
        setErrorMessage("");
      }

      if (value.target.value.length > MESSAGE_LENGTH){
        setErrorMessage("Sorry, your post is too long");
      }
    }

    const handleTransitionEnd = () => {
      if (loading === 100){
        setLoading(0);
        setTransitionTime(0);
      }
    };

    const displayCheckBox = () => {
      if (mintData.length > MESSAGE_LENGTH) {
        return
      }
      else {
        setIsCheckboxOpen(true);
      }
    }

    const handleCheck = (event) => {
      setIsChecked(event.target.checked);
      setIsOpen(true);
    };

    const captchaClicked = (value) => {
      if (value){
        mint(value);
      }
      setIsOpen(false);
      setIsCheckboxOpen(false);
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
            <Button onClick={() => displayCheckBox()} 
              className={"MintBoxButton"}
              disabled={ props.state.isConnected && mintData !== "" ? false : true}
              disableRipple
              >
                  Post
            </Button>
            <p className="PostError">{errorMessage}</p>
          </div>
          {isCheckboxOpen && 
          <div className="AgreeCheckbox">
              <Checkbox defaultChecked onChange={handleCheck} checked={isChecked} />
              <p>I am 18 years of age or older and agree to the following <a href={TERMS_AND_CONDITIONS} target="_blank">terms and conditions</a>.</p>
            </div>
          }
          {isOpen && isChecked &&
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