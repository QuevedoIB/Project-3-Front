import React, { Component } from 'react';
import { withContacts } from '../../providers/ContactProvider';

class SearchCard extends Component {
  render() {
    const { username, quote, interests } = this.props.user;
    return (
      <div>
        <h2>{username}</h2>
        <p>{quote}</p>
        <ul>
          {interests.map((e, index) => <li key={`${e}${index}`}>{e}</li>)}
        </ul>
      </div>
    )
  }
}

export default withContacts(SearchCard);
