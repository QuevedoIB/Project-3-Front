import React, { Component } from 'react';
import './Error.scss';

export default class Error extends Component {
  render() {
    return (
      <div className='error-square'>
        <button className='error-square-close' onClick={this.props.onErrorClose}>X</button>
        <img className='error-square-warning' src={process.env.PUBLIC_URL + '/images/warning.png'} alt='warning' />
        <h3>{this.props.error}</h3>
      </div>
    )
  }
}
