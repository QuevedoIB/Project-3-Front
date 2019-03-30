import React, { Component } from 'react';
import './Spinner.scss';

export default class Spinner extends Component {
  render() {
    return (<>
      <div className="spinner">
        <div className="spinner__bar"></div>
        <div className="spinner__bar"></div>
        <div className="spinner__bar"></div>
        <div className="spinner__bar"></div>
      </div>
    </>
    )
  }
}
