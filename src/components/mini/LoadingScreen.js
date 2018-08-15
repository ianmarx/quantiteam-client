import React from 'react';

const LoadingScreen = () => {
  return (
    <div className='loading-screen'>
      <div>Loading</div>
      <div className='loading-dots'>
        <div className='dot one'>.</div><div className='dot two'>.</div><div className='dot three'>.</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
