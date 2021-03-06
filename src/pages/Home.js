import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import './pages-scss/home.scss';

class Home extends Component {

  state = {
    googleSignUp: '',
  }

  componentDidMount = async () => {
    const url = await this.props.getGoogleSignUrl();

    this.setState({
      googleSignUp: url.url
    })
  }

  render() {
    return (
      <section className="page home full">
        <img className="bg-image" src={process.env.PUBLIC_URL + '/images/bg-home-2.png'} alt='header' />
        <article>
          <div>
            <h1>Tinder Sorpresa</h1>
          </div>
          <div className="logo-container">
            <div className="logo-background">
              <div className="logo"></div>
            </div>
          </div>
          <div>
            <h3>Find people compatible with you</h3>
          </div>
          <div>
            <Link to='/signup' className="link-button">Sign Up</Link>
            <p>If you already have an account: <Link to='/login' className="link-text">Log In</Link></p>
            <a href={this.state.googleSignUp} className="google-signup"><img src={process.env.PUBLIC_URL + '/images/google.png'} alt='google' /><p>Google Sign up</p></a>
          </div>
        </article>
      </section>
    )
  }
}

export default withAuth(Home)