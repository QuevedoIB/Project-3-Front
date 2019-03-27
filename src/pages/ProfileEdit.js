import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

const ENTER_KEY = 13;
const COMMA_KEY = 188;
const BACKSPACE_KEY = 8;

class ProfileEdit extends Component {

  state = {
    username: '',
    password: '',
    quote: '',
    valueInterests: '',
    interests: [],
    currentUser: this.props.user.username,
    currentPassword: '',
  }

  componentDidMount() {
    this.setState({
      username: this.props.user.username,
      quote: this.props.user.quote,
      interests: this.props.user.interests,
    })
  }

  handleChange = (e) => {
    console.log(e.target, this.state)
    const input = e.target.name;
    this.setState({
      [input]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {};

    for (let prop in this.state) {
      if (!this.state[prop]) {
        data[prop] = this.props.user[prop]
      } else {
        data[prop] = this.state[prop];
      }
    }
    console.log(data);
    this.props.editUser(data);
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
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username"></label>
        <input type="text" id='new-username' value={username} onChange={(e) => this.handleChange(e)} name='username' />
        <label htmlFor="new-password"></label>
        <input type="password" id='new-password' value={password} onChange={(e) => this.handleChange(e)} name='password' />
        <label htmlFor="new-quote"></label>
        <input type="text" id='new-quote' value={quote} onChange={(e) => this.handleChange(e)} name='quote' />
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
        <button>Save Changes</button>
      </form>
    )
  }
}

export default withAuth(ProfileEdit);
