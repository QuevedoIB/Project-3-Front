import React, { Component } from 'react';
import Navbar from '../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import SignUpButton from '../components/buttons/SignUpButton' // <-

export default class Home extends Component {
  render() {
    return (
      <section>
        {/* <Navbar data='data' /> */}
        <article>
          <div>
            <h1>Project Title</h1>
            <img src='' alt='home' />
          </div>
          <div>
            <h3>Slogan</h3>
            <p>1 linea que describa app y conjunte con eslogan</p>
          </div>
          <div>
            <Link to='/signup' className="link-button">Sign Up</Link>
            <p>If you already have an account: <Link to='/login' className="link-text">Log In</Link></p>
            
          </div>
        </article>
      </section>
    )
  }
}
