import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../providers/AuthProvider';
import './Navbar.scss';

const styleEnd = {
  display: 'none',
}

class Navbar extends Component {

  state = {
    toogled: '',
    classStyle: 'no-animation',
    displayed: false,
    firstClick: 'first-click',
  }

  handleClick = () => {
    this.state.toogled ?
      this.setState({ toogled: '', classStyle: 'no-animation', displayed: !this.state.displayed }) :
      this.setState({ firstClick: '', toogled: 'active', classStyle: '', displayed: !this.state.displayed })
  }

  handleAnimationEnd() {

  }

  checkLogged() {
    const { classStyle, toogled, displayed, firstClick } = this.state;
    const { isLogged, logout } = this.props;
    let animationBack;
    if (displayed) {
      animationBack = 'nav-item'
    } else {
      animationBack = 'nav-item-rev'
    }

    if (isLogged) {
      return <div>
        <Link id={firstClick} className={`${animationBack}-2`} to='/login'>Login</Link>
        <button id={firstClick} className={`${animationBack}-3`} onClick={logout}>Logout</button>
      </div>
    } else {
      return <div>
        <Link id={firstClick} className={`${animationBack}-2`} to='/login'>Login</Link>
        <Link id={firstClick} className={`${animationBack}-3`} to='/signup'>Signup</Link>
      </div>
    }
  }

  render() {
    const { classStyle, toogled } = this.state;
    return <div class="frame">
      <div class="center">
        <div class={`menu-icon ${toogled}`} onClick={this.handleClick}>
          <div class={`line-1 ${classStyle}`}></div>
          <div class={`line-2 ${classStyle}`}></div>
          <div class={`line-3 ${classStyle}`}></div>
          {this.checkLogged()}
        </div>
      </div>
    </div>

  }
}

export default withAuth(Navbar);



/*

let styleEnd;

class Navbar extends Component {

  state = {
    toogled: '',
    classStyle: 'no-animation',
    displayed: false,
    firstClick: 'first-click',
  }

  handleClick = () => {
    this.state.toogled ?
      this.setState({ toogled: '', classStyle: 'no-animation', displayed: !this.state.displayed }) :
      this.setState({ firstClick: '', toogled: 'active', classStyle: '', displayed: !this.state.displayed })
  }

  handleAnimationEnd = () => {
    console.log('hola');
    if (this.state.displayed) {
      styleEnd = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }
    } else {
      styleEnd = {
        display: 'none',
      }
    }
  }

  checkLogged() {
    const { classStyle, toogled, displayed, firstClick } = this.state;
    const { isLogged, logout } = this.props;
    let animationBack;
    if (displayed) {
      animationBack = 'nav-item'
    } else {
      animationBack = 'nav-item-rev'
    }

    if (isLogged) {
      console.log(styleEnd);
      return <div>
        <Link style={styleEnd} className={`${animationBack}-2`} to='/login' onAnimationEnd={this.handleAnimationEnd}>Login</Link>
        <button style={styleEnd} className={`${animationBack}-3`} onClick={logout} onAnimationEnd={this.handleAnimationEnd}>Logout</button>
      </div>
    } else {
      return <div>
        <Link style={styleEnd} className={`${animationBack}-2`} to='/login' onAnimationEnd={this.handleAnimationEnd}>Login</Link>
        <Link style={styleEnd} className={`${animationBack}-3`} to='/signup' onAnimationEnd={this.handleAnimationEnd}>Signup</Link>
      </div>
    }
  }
*/