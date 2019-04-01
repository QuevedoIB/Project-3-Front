import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import './pages-scss/profileEdit.scss';
import { getErrorMessage } from '../lib/helpers/error-handler';
import Error from '../components/error/Error';
import { passwordStrengthCheck } from '.././lib/helpers/password-strength';
import Navbar from '../components/navbar/Navbar';

const ENTER_KEY = 13;
const COMMA_KEY = 188;
const BACKSPACE_KEY = 8;

class ProfileEdit extends Component {

  state = {
    username: this.props.user.username,
    password: '',
    quote: this.props.user.quote,
    valueInterests: '',
    interests: this.props.user.interests,
    currentPassword: '',
    error: '',
  }

  handleChange = (e) => {
    const input = e.target.name;
    this.setState({
      [input]: e.target.value,
    })
  }

  checkPasswordStrength() {
    passwordStrengthCheck();
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await this.props.editUser(this.state);

      if (this.props.isError) {
        this.props.onErrorSolved();
      }

      this.props.history.push('/profile')
    } catch (err) {
      this.setState({
        error: getErrorMessage(err),
      })
    }
  }

  handleKeyUp = (e) => {

    const key = e.keyCode;

    if (key === ENTER_KEY || key === COMMA_KEY) {
      this.addTag();
    }
  }

  handleKeyDown = (e) => {
    const key = e.keyCode;
    if (key === BACKSPACE_KEY && !this.state.valueInterests) {
      this.editPrevTag();
    } else if (key === 13) {
      e.preventDefault();
    }
  }

  addTag = () => {
    const { interests, valueInterests } = this.state;
    let interest = valueInterests.trim();

    interest = interest.replace(/,/g, "");

    if (!interest) {
      return;
    }

    this.setState({
      interests: [...interests, interest],
      valueInterests: ""
    });
  }

  editPrevTag = () => {
    let { interests } = this.state;

    const interest = interests.pop();

    this.setState({ interests, valueInterests: interest });
  }


  onErrorClose = () => {
    this.setState({
      error: '',
    })
  }

  handleErrorMessage = () => {
    const { error } = this.state;
    if (error) {
      return <Error error={error} onErrorClose={this.onErrorClose} />
    }
  }


  render() {

    const { username, password, quote, valueInterests, currentPassword, interests } = this.state;

    return (
      <form onSubmit={(e) => this.handleSubmit(e)} className="profile-edit">
        <img src={process.env.PUBLIC_URL + '/images/bg-edit.png'} className="bg-image" alt='header' />
        <div className="page">
          <h1>Edit profile</h1>
          {this.handleErrorMessage()}
          <label htmlFor="username">New username</label>
          <input type="text" id='new-username' value={username} onChange={(e) => this.handleChange(e)} name='username' />
          <label htmlFor="pass">New password</label>
          <input type="password" id='pass' value={password} onChange={(e) => { this.handleChange(e); this.checkPasswordStrength() }} name='password' />
          <meter className="hide" max="4" id="password-strength-meter">
            <p id="password-strength-text"></p>
          </meter>
          <label htmlFor="new-quote">New quote</label>
          <input type="text" id='new-quote' value={quote} onChange={(e) => this.handleChange(e)} name='quote' />
          <label htmlFor="username">Interests</label>
          <div className="tags">
            <ul className="tags-list">
              {interests.map((interest, i) => (
                <li key={interest + i} className="tag">
                  {interest}
                </li>
              ))}
            </ul>
            <input
              type="text"
              name="valueInterests"
              placeholder="Interests, hobbies..."
              value={valueInterests}
              onChange={this.handleChange}
              ref="tag"
              className="tag-input"
              onKeyUp={this.handleKeyUp}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <small>
            Press <code>enter</code> or <code>,</code> to add a tag. Press{" "}
            <code>backspace</code> to edit previous tag.
        </small>
          <label htmlFor="current-password">Current Password: </label>
          <input type="password" id='current-password' value={currentPassword} onChange={(e) => this.handleChange(e)} name='currentPassword' required />
          <button className="link-button">Save Changes</button>
          {this.props.isError && <div>Incorrect Password</div>}
        </div>
        <Navbar />
        <Link to='/profile' className="back-button"><img src={process.env.PUBLIC_URL + '/images/back.png'} alt="back" width="45px"/></Link>
     
      </form>
    )
  }
}

export default withAuth(ProfileEdit);
