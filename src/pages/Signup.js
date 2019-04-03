import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import InfoFields from '../components/signup/InfoFields';
import { getErrorMessage } from '../lib/helpers/error-handler';
import Error from '.././components/error/Error';

import './pages-scss/signup.scss';
import { checkIfPasswordOkay } from '../lib/helpers/password-strength';


class Signup extends Component {

  state = {
    username: '',
    password: '',
    email: '',
    allFields: true,
    error: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, email } = this.state;
    const userData = {
      username,
      password,
      email
    }


    console.log(checkIfPasswordOkay())
    if (checkIfPasswordOkay()) {
      this.props.signup(userData)
        .then((data) => {
          if (!this.props.errorType) {
            this.props.history.push('/profile')
          } else {
            this.setState({
              error: getErrorMessage(this.props.errorType),
            })
          }
        })
        .catch(error => console.log(error))
    } else {
      this.setState({ error: 'Password Strength too low' })
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
    const { username, password, email, imageUrl } = this.state;
    return (
      <div className="page signup">
        <img className="bg-image" src={process.env.PUBLIC_URL + '/images/bg-pages.png'} alt='header' />
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data" className="user-form">
          <div>
            <p className="login-text">Already have account?
          <Link to={"/login"} className="link-white"> Login</Link>
            </p>
            <h1 className="title">Sign up</h1>
            {this.handleErrorMessage()}
            <InfoFields
              username={username}
              password={password}
              email={email}
              imageUrl={imageUrl}
              handleChange={this.handleChange}
              handleUploadStart={this.handleUploadStart}
              handleUploadError={this.handleUploadError}
              handleUploadSuccess={this.handleUploadSuccess}
            />
            <button type='submit' className="link-button">Sign Up</button>
          </div>
          {!this.state.allFields && <h3>Missing Fields</h3>}
        </form>
      </div>
    )
  }
}

export default withAuth(Signup);