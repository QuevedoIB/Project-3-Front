import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

import './pages-scss/login.scss';

class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    this.props.login({ username, password })
      .then(() => { })
      .catch(error => console.log(error));

    if (this.props.isError) {

      this.props.onErrorSolved();
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="page">
        <img className="bg-image" src={process.env.PUBLIC_URL + '/images/bg-pages.png'} alt='header' />
        <form onSubmit={this.handleFormSubmit} className="login-form">
          <div>
            <p className="signup-text">Need an Account? <Link to='/signup' className="link-white">Sign Up</Link></p>
          </div>
          <h1 className="title">Log in</h1>
          <div className="column-content login-fields">
            <label>Username</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} />
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
          </div>
          <button type="submit" className="link-button login-button">Log in</button>
        </form>
        {this.props.isError && <div>Incorrect User</div>}
      </div>
    )
  }
}

export default withAuth(Login);
