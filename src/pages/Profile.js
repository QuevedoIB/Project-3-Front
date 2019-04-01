import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import './pages-scss/profile.scss';

class Profile extends Component {

  checkUserData() {
    const { interests, location, personality, quote } = this.props.user;
    console.log(this.props.user.location)

    if (interests.length && location.coords.length && personality.length && quote) {
      return <div className='completed-profile-box'>
        <Link className='link-button profile-button' to='contacts'>Contacts</Link>
        <Link className='link-button profile-button' to='search-people'>Search People</Link>
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

    const { username, imageUrl, quote } = this.props.user;

    return (
      <section className='profile-section'>
        <header>
          <img className='bg-image' src={process.env.PUBLIC_URL + '/images/bg-profile.png'} alt='profile'></img>
          <Link id='edit-profile-image' to='/profile/edit'><img src={process.env.PUBLIC_URL + '/images/edit-profile.png'} alt='edit-profile' width="80px" /></Link>
          <div className='header-profile'>
            <img src={imageUrl} alt={username} />
            <h1>{username}</h1>
          </div>
          <p className="user-quote">{quote}</p>
        </header>
        {this.checkUserData()}
        <Navbar />
      </section >
    )
  }
}

export default withAuth(Profile);
