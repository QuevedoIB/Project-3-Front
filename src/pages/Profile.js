import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

class Profile extends Component {
  render() {
    // console.log(this.props.user)
    // const { username } = this.props;
    return (
      <section>
        {/* <div>
          <h1>{username}</h1>
          <img src='' alt={username} />
        </div>
        <p>quote</p>
        <div>
          <Link to='search-people'>Search People</Link>
          <Link to='search-people'>Contacts</Link>
        </div> */}
      </section>
    )
  }
}

export default withAuth(Profile);