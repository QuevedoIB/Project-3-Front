import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import InfoFields from '../components/signup/InfoFields';
import { getErrorMessage } from '../lib/helpers/error-handler';

import './pages-scss/signup.scss';

import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBPiQmXBjc3QAVnensxPXbuxjeYgm1-kb8",
  authDomain: "tinder-sorpresa-e6911.firebaseapp.com",
  databaseURL: "https://tinder-sorpresa-e6911.firebaseio.com",
  projectId: "tinder-sorpresa-e6911",
  storageBucket: "tinder-sorpresa-e6911.appspot.com",
  messagingSenderId: "418490957792"
};
firebase.initializeApp(config);

class Signup extends Component {

  state = {
    username: '',
    password: '',
    email: '',
    imageUrl: '',
    allFields: true,
    imageProfile: '',
    isUploading: false,
    progress: 0,
    error: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, email, imageUrl } = this.state;
    const userData = {
      username,
      password,
      email,
      imageUrl,
    }

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
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleUploadStart = () => {
    this.setState({ isUploading: true, progress: 0 });
  }
  handleProgress = (progress) => {
    this.setState({ progress });
  }
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    this.setState({ imageProfile: filename, progress: 100, isUploading: false });
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({ imageUrl: url }));
  };

  onErrorClose = () => {
    this.setState({
      error: '',
    })
  }

  handleErrorMessage = () => {
    const { error } = this.state;
    if (error) {
      return <div className='error-square'>
        <button className='error-square-close' onClick={this.onErrorClose}>X</button>
        <img className='error-square-warning' src={process.env.PUBLIC_URL + '/images/warning.png'} alt='warning' />
        <h3>{error}</h3>
      </div>
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