import React, { Component } from 'react';
import './Interests.css';

const ENTER_KEY = 13;
const COMMA_KEY = 188;
const BACKSPACE_KEY = 8;


export default class Interests extends Component {

  state = {
    interests: [],
    value: '',
  }


  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleKeyUp = (e) => {
    const key = e.keyCode;

    if (key === ENTER_KEY || key === COMMA_KEY) {
      this.addTag();
    }
  }

  handleKeyDown = (e) => {
    const key = e.keyCode;
    if (key === BACKSPACE_KEY && !this.state.value) {
      this.editPrevTag();
    }
  }

  addTag = () => {
    const { interests, value } = this.state;
    let interest = value.trim();

    interest = interest.replace(/,/g, "");

    if (!interest) {
      return;
    }

    this.setState({
      interests: [...interests, interest],
      value: ""
    });
  }

  editPrevTag = () => {
    let { interests } = this.state;

    const interest = interests.pop();

    this.setState({ interests, value: interest });
  }

  render() {
    const { interests, value } = this.state;
    return (
      <div className="form">
        <div className="tags">
          <ul>
            {interests.map((interest, i) => (
              <li key={interest + i} className="tag">
                {interest}
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Add tag..."
            value={this.props.value}
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
      </div>
    );
  }
}

