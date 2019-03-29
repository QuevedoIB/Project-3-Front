import React, { Component } from 'react';
import './Interests.css';

// const ENTER_KEY = 13;
// const COMMA_KEY = 188;
// const BACKSPACE_KEY = 8;


export default class Interests extends Component {

  render() {
    const { interests, valueInterests, quote } = this.props;
    return (
      <div className="form-interests">
        <h3>Quote</h3>
        <input name="quote" value={quote} onChange={this.props.handleChange} placeholder="Tell something about you" className="quote-form" />
        <h3>Interests</h3>
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
            placeholder="Hobbies, likes..."
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

