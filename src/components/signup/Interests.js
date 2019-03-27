import React, { Component } from 'react';
import './Interests.css';

// const ENTER_KEY = 13;
// const COMMA_KEY = 188;
// const BACKSPACE_KEY = 8;


export default class Interests extends Component {

  // state = {
  //   interests: [],
  //   value: '',
  // }


  // handleChange = (e) => {
  //   this.setState({
  //     value: e.target.value
  //   });
  // }

  // handleKeyUp = (e) => {
  //   const key = e.keyCode;

  //   if (key === ENTER_KEY || key === COMMA_KEY) {
  //     this.addTag();
  //   }
  // }

  // handleKeyDown = (e) => {
  //   const key = e.keyCode;
  //   if (key === BACKSPACE_KEY && !this.state.value) {
  //     this.editPrevTag();
  //   }
  // }

  // addTag = () => {
  //   const { interests, value } = this.state;
  //   let interest = value.trim();

  //   interest = interest.replace(/,/g, "");

  //   if (!interest) {
  //     return;
  //   }

  //   this.setState({
  //     interests: [...interests, interest],
  //     value: ""
  //   });
  // }

  // editPrevTag = () => {
  //   let { interests } = this.state;

  //   const interest = interests.pop();

  //   this.setState({ interests, value: interest });
  // }

  render() {
    const { interests, valueInterests, quote } = this.props;
    return (
      <div className="form">
        <input name="quote" value={quote} onChange={this.props.handleChange} placeholder="Tell something about you" maxlentgh="100"/>
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
            onChange={this.props.handleChange}
            ref="tag"
            className="tag-input"
            onKeyUp={this.props.handleKeyUp}
            onKeyDown={this.props.handleKeyDown}
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

