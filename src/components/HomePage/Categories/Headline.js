import React from 'react';


class Headline extends React.Component {
  render() {
    return (
      <div id="headline-container">
        <div id="headline">{this.props.title}{this.props.name}</div>
      </div>
    )
  }
}


export default Headline;

