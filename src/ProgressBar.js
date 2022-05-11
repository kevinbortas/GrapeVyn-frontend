import React, { useEffect, useState } from 'react';

const ProgressBar = (props) => {
    const { completed, transitionTime } = props;

    let bgcolor;

    if (completed === 100){
        bgcolor = "#6AC888"
    }
    else {
        bgcolor = "#A26AF1"
    }
  
    const containerStyles = {
      height: 5,
      width: '100%',
      backgroundColor: "#FFFFFF",
      borderRadius: 50,
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      transition: `width ${transitionTime}s ease-in-out`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      justifyContent: 'center',
      textAlign: 'center'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles} onTransitionEnd={ (ev) => props.onTransitionEnd(ev) }>
          <span style={labelStyles}></span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;