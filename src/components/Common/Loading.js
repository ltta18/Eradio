import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = () => (
  <div>
    <ReactLoading className="loading-page" type="spinningBubbles" color="#F58732" height={200} width={200} />
    <div className="loading-page">Loading...</div>
  </div>
);
 
export default Loading;