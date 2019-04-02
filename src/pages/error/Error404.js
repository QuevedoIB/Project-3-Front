import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Error404.scss';

export default class Error404 extends Component {
  render() {
    return (<>
      <div class="face">
        <div class="band">
          <div class="red"></div>
          <div class="white"></div>
          <div class="blue"></div>
        </div>
        <div class="eyes"></div>
        <div class="dimples"></div>
        <div class="mouth"></div>
      </div>

      <h1 className='title-error'>Oops! Something went wrong!</h1>
      <div className="btn"><Link to='/'>Return to HOME</Link></div>
    </>
    )
  }
}
