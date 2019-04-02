import React, { Component } from 'react'
import './InfoFields.scss';
import { passwordStrengthCheck } from '../../lib/helpers/password-strength';


export default class InfoFields extends Component {

  checkPasswordStrength() {
    passwordStrengthCheck();
  }

  render() {
    return (
      <div className="column-content form-fields">
        <label htmlFor='username'>Username:</label>
        <input type="text" name="username" value={this.props.username} onChange={this.props.handleChange} required maxLength="12"/>
        <label htmlFor='password'>Password:</label>
        <input id='pass' type="password" name="password" value={this.props.password} onChange={(e) => { this.props.handleChange(e); this.checkPasswordStrength() }} required maxLength="100"/>
        <meter className="hide" max="4" id="password-strength-meter">
          <p id="password-strength-text"></p>
        </meter>
        <label htmlFor='email' >Email:</label>
        <input type="email" name="email" value={this.props.email} onChange={this.props.handleChange} required maxLength="100"/>
      </div>
    )
  }
}
