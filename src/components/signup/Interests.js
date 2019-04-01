import React, { Component } from 'react';
import './Interests.css';
import { mainMap, getLocationValue } from '../../lib/autocomplete-location';
import { getCoordsFromPlace } from '../../lib/filter-by-location';

// const ENTER_KEY = 13;
// const COMMA_KEY = 188;
// const BACKSPACE_KEY = 8;


export default class Interests extends Component {

  componentDidMount() {
    mainMap(this.setLocation);
  }

  setLocation = () => {
    this.props.getLocationText(getLocationValue());
  }

  render() {
    const { interests, valueInterests, quote } = this.props;
    return (
      <div className="form-interests">
        <label>Quote</label>
        <input name="quote" value={quote} onChange={this.props.handleChange} placeholder="Tell something about you" className="quote-form" required />
        <label>Interests</label>
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
            required
          />
        </div>
        <small>
          Press <code>enter</code> or <code>,</code> to add a tag. Press{" "}
          <code>backspace</code> to edit previous tag.
        </small>
        <label>Your location</label>
        <div id="location" className='geocoder'>

        </div>

        <div id="map" className="map-create-event hide"></div>
      </div>
    );
  }
}

