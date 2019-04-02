import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { getErrorMessage } from '../lib/helpers/error-handler';
import Error from '../components/error/Error';

import './pages-scss/login.scss';

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    this.props.login({ username, password })
      .then(() => { })
      .catch(error => this.setState({ error: getErrorMessage(error), }));

    if (this.props.isError) {

      this.props.onErrorSolved();
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onErrorClose = () => {
    this.setState({
      error: '',
    })
  }

  handleErrorMessage = () => {
    const { error } = this.state;
    if (error) {
      return <Error error={error} onErrorClose={this.onErrorClose} />
    }
  }

  render() {
    const { username, password} = this.state;
    return (
      <div className="page">
        <img className="bg-image" src={process.env.PUBLIC_URL + '/images/bg-pages.png'} alt='header' />
        <form onSubmit={this.handleFormSubmit} className="login-form">
          <div>
            <p className="signup-text">Need an Account? <Link to='/signup' className="link-white">Sign Up</Link></p>
          </div>
          <h1 className="title-login">Log in</h1>
          {this.handleErrorMessage()}
          <div className="column-content login-fields">
            <label>Username</label>
            <input type="text" name="username" value={username} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} required />
          </div>
          <button type="submit" className="link-button login-button">Log in</button>
        </form>
      </div>
    )
  }
}

export default withAuth(Login);
