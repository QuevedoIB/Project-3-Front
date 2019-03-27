import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

class Profile extends Component {
  render() {
    const { username, imageUrl, quote } = this.props.user;
    return (
      <section>
        <Link to='/profile/edit'><img src='https://image.flaticon.com/icons/svg/60/60473.svg' alt='edit-profile' /></Link>
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
    )
  }
}

export default withAuth(Profile);