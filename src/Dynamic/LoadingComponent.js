import 'Dynamic/LoadingComponent.css';
import React from 'react';
import grapeLogo from 'icons/GrapeLogo_PRD_Alpha45_00000.png';

export const LoadingContentCircle = () => {
  return (
    <div>
      <div className='LoaderWrapper'>
        <div className='ContentSpinner'>
            <div className='ContentHalfSpinner'></div>
        </div>
      </div>
    </div>
  )
}

function Loading() {
  return (
    <div>
      <div className='LoaderWrapper'>
        <div className='Spinner'>
            <div className='HalfSpinner'></div>
                <img src={grapeLogo}/>
        </div>
      </div>
    </div>
  );
}

export default Loading;
