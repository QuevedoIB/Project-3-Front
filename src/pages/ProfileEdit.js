import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import './pages-scss/profileEdit.scss';

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
  }

  handleChange = (e) => {
    const input = e.target.name;
    this.setState({
      [input]: e.target.value,
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // const data = {};

    // for (let prop in this.state) {
    //   if (!this.state[prop]) {
    //     data[prop] = this.props.user[prop]
    //   } else {
    //     data[prop] = this.state[prop];
    //   }
    // }
    try {
      await this.props.editUser(this.state);

      if (this.props.isError) {
        this.props.onErrorSolved();
      }

      this.props.history.push('/profile')
    } catch (err) {
      console.log(err);
    }
  }

  handleKeyUp = (e) => {
    //e.preventDefault();
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

  render() {

    const { username, password, quote, valueInterests, currentPassword, interests } = this.state;

    return (
      <form onSubmit={(e) => this.handleSubmit(e)} className="profile-edit">
        <img src={process.env.PUBLIC_URL + '/images/bg-edit.png'} className="bg-image" alt='header' />
        <div className="page">
        <h1>Edit profile</h1>
          <label htmlFor="username">New username</label>
          <input type="text" id='new-username' value={username} onChange={(e) => this.handleChange(e)} name='username' />
          <label htmlFor="new-password">New password</label>
          <input type="password" id='new-password' value={password} onChange={(e) => this.handleChange(e)} name='password' />
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
        <Link to='/profile' className="back-button">Back</Link>
      </form>
    )
  }
}

export default withAuth(ProfileEdit);
