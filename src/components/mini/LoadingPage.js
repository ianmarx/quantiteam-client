import React from 'react';

const LoadingPage = () => {
  return (
    <div className='loading-page'>
      <div className='loading-screen'>
        <div>Loading</div>
        <div className='loading-dots'>
          <div className='dot one'>.</div><div className='dot two'>.</div><div className='dot three'>.</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
