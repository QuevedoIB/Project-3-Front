import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../providers/AuthProvider';
import './Navbar.scss';

class Navbar extends Component {

  state = {
    toogled: '',
    classStyle: 'no-animation',
    displayed: false,
    firstClick: false,
  }

  handleClick = () => {
    this.state.toogled ?
      this.setState({ toogled: '', classStyle: 'no-animation', displayed: !this.state.displayed }) :
      this.setState({ toogled: 'active', classStyle: '', displayed: !this.state.displayed, firstClick: true })
  }


  checkLogged() {
    const { displayed, firstClick } = this.state;
    const { isLogged, logout } = this.props;
    let animationBack;

    if (firstClick) {
      if (displayed) {
        animationBack = 'nav-item'
      } else {
        animationBack = 'nav-item-rev'
      }
      if (isLogged) {
        return <div className='buttons-navbar'>
          <Link className={`${animationBack}-2`} to='/profile'><img src={process.env.PUBLIC_URL + '/images/man-user.png'} alt='profile' width="30px"/></Link>
          <button className={`${animationBack}-3`} onClick={logout}><img src={process.env.PUBLIC_URL + '/images/logout.png'} alt='logout' width="30px"/></button>
        </div>
      } else {
        return <div className='buttons-navbar'>
          <Link className={`${animationBack}-2`} to='/login'>Login</Link>
          <Link className={`${animationBack}-3`} to='/signup'>Signup</Link>
        </div>
      }
    }
  }

  render() {
    const { classStyle, toogled } = this.state;
    return (
      <>
        <div className="frame">
          <div className="center">
            <div className={`menu-icon ${toogled}`} onClick={this.handleClick}>
              <div className={`line-1 ${classStyle}`}></div>
              <div className={`line-2 ${classStyle}`}></div>
              <div className={`line-3 ${classStyle}`}></div>
            </div>
          </div>
        </div>
        {this.checkLogged()}
      </>
    )
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