import './css/LoadingComponent.css';
import React from 'react';
import grapeLogo from './icons/grape.png';

export const LoadingContentCircle = () => {
  return (
    <div className='LoaderWrapper'>
      <div className='ContentSpinner'>
          <div className='ContentHalfSpinner'></div>
      </div>
    </div>
  )
}

function Loading() {
  return (
    <div className='LoaderWrapper'>
      <div className='Spinner'>
          <div className='HalfSpinner'></div>
          {/* <img src={grapeLogo} className="icon"/> */}
      </div>
    </div>
  );
}

export default Loading;
