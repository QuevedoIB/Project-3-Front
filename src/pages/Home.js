import React, { Component } from 'react';
import Navbar from '../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import SignUpButton from '../components/buttons/SignUpButton' // <-

export default class Home extends Component {
  render() {
    return (
      <section>
        <Navbar />
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
            <SignUpButton>Sign Up</SignUpButton>
            <p>If you already have an account</p>
            <Link to='/login'>Log In</Link>
          </div>
        </article>
      </section>
    )
  }
}
