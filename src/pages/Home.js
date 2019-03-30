import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

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
        {/* <Navbar data='data' /> */}
        <article>
          <div>
            <h1>Project Title</h1>
            <img src='' alt='home' />
          </div>
          <div>
            <h3>Slogan</h3>
          </div>
          <div>
            <Link to='/signup' className="link-button">Sign Up</Link>
            <p>If you already have an account: <Link to='/login' className="link-text">Log In</Link></p>
            <a href={this.state.googleSignUp} target="_blank">Google Sign Up</a>
          </div>
        </article>
      </section>
    )
  }
}

export default withAuth(Home)