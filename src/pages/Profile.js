import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

class Profile extends Component {
  render() {
    const { username, imageUrl, quote } = this.props.user;
    return (
      <>
        <Navbar />
        <section>
          <Link to='/profile/edit'><img src={process.env.PUBLIC_URL + '/images/settings.png'} alt='edit-profile' width="80px" /></Link>
          <Link to='/profile/complete'><img src={process.env.PUBLIC_URL + '/images/settings.png'} alt='complete-profile' width="80px" /></Link>
          <div>
            <img src={imageUrl} alt={username} />
            <div>
              <h1>{username}</h1>
              <p>{quote}</p>
            </div>
          </div>
          <div>
            <Link to='search-people'>Search People</Link>
            <Link to='contacts'>Contacts</Link>
          </div>
        </section >
      </>
    )
  }
}

export default withAuth(Profile);

//componente profile, si el this.props.user no tiene alguna de las propiedades -> personality, interest, quote -> 
//que se renderice solo un boton/link para que complete esos pasos