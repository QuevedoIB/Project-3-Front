import React, { Component } from 'react';
import './Spinner.css';

export default class Spinner extends Component {
  render() {
    return (<>
      <div class="arc">
      </div>
      <h1><span>LOADING</span></h1>
    </>
    )
  }
}
