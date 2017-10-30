import React from 'react';
export default class Square extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <button className="square" onClick={this.props.handleClick}>
      {this.props.value}
  </button>
    );
  }
}