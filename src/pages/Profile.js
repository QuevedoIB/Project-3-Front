import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Spinner from '../components/loading/Spinner';
import './pages-scss/profile.scss';

import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';


class Profile extends Component {


  state = {
    imageUrl: this.props.user.imageUrl,
    imageProfile: '',
    isUploading: false,
    progress: 0,
  };


  handleUploadStart = () => {
    console.log('start upload');
    this.setState({ isUploading: true, progress: 0 });
  }
  handleProgress = (progress) => {
    this.setState({ progress });
  }
  handleUploadError = (error) => {
    this.setState({ isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    console.log('upload success');
    this.setState({ imageProfile: filename, progress: 100, isUploading: false });
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({ imageUrl: url }));
  };

  checkUserData() {
    const { interests, location, personality, quote } = this.props.user;


    if (interests.length && location.coords.length && personality.length && quote) {
      return <div className='completed-profile-box'>
        <Link className='link-button profile-button' to='contacts'>Contacts</Link>
        <Link className='link-button profile-button' to='search-people'>Search friends</Link>
      </div>
    } else {
      return <div className='need-complete-box'>
        <div className='alert-div'>
          <div className="notification-box">
            <div className="notification-bell">
              <span className="bell-top"></span>
              <span className="bell-middle"></span>
              <span className="bell-bottom"></span>
              <span className="bell-rad"></span>
            </div>
          </div>
          <div className='title-button'>
            <h3 className='complete-box-title'>Complete your profile and start meeting people!</h3>
            <Link className='link-button' to='/profile/complete'>Get Ready!</Link>
          </div>
        </div>
      </div>
    }
  }

  render() {
    const changeButtonHidden = this.state.isUploading ? 'hidden-button-image' : '';

    const { username, quote } = this.props.user;
    const { imageUrl } = this.state;
    console.log(this.state.progress);
    console.log(imageUrl);
    return (
      <section className='profile-section'>
        <div>
          <header>
            <img className='bg-image' src={process.env.PUBLIC_URL + '/images/bg-profile.png'} alt='profile'></img>
            <Link id='edit-profile-image' to='/profile/edit'><img src={process.env.PUBLIC_URL + '/images/edit-profile.png'} alt='edit-profile' width="80px" /></Link>
            <div className='header-profile'>
              <div className="image-container">
                <label className={`file-uploader ${changeButtonHidden}`}>
                  <FileUploader
                    hidden
                    accept="image/*"
                    name="imageUrl"
                    randomizeFilename
                    storageRef={firebase.storage().ref('images')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress} />
                </label>
                {this.state.isUploading ? <Spinner className="spinner-image" /> : <img src={imageUrl} alt={username} />}
              </div>
              <h1>{username}</h1>
            </div>
            <p className="user-quote">{quote}</p>
          </header>
          {this.checkUserData()}
          <Navbar />
        </div>
      </section >
    )
  }
}

export default withAuth(Profile);
