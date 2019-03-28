import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
class Profile extends Component {
  render() {
    const { username, imageUrl, quote } = this.props.user;
    return (
      <>
      <Navbar/>
      <section>
        <Link to='/profile/edit'><img src={process.env.PUBLIC_URL + '/images/settings.png'} alt='edit-profile' width="80px"/></Link>
        <div>
          <img src={imageUrl} alt={username} />
          <div>
            <h1>{username}</h1>
            <p>{quote}</p>
          </div>
        </div>
        <div>
          <Link to='search-people'>Search People</Link>
          <Link to='search-people'>Contacts</Link>
        </div>
      </section >
      </>
    )
  }
}

export default withAuth(Profile);