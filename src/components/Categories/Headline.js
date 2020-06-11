import React from 'react';


const Headline = (props) => {
  return (
    <div id="headline-container">
      <div id="headline">{props.title}{props.name}</div>
    </div>
  )
}


export default Headline;

