import React, { Component } from 'react';
import { withContacts } from '../../providers/ContactProvider';
import '../components-scss/SearchCard.scss';

class SearchCard extends Component {
  render() {
    const { username, quote, interests } = this.props.user;
    const location = this.props.user.location.name;
    return (
      <div>
        <div className='search-card-head'>
          <h2>{username}</h2>
          <p>{location}</p>
        </div>
        <p className='search-card-quote'>"{quote}"</p>
        <ul>
          {interests.map((e, index) => <li key={`${e}${index}`}>{e}</li>)}
        </ul>
      </div>
    )
  }
}

export default withContacts(SearchCard);
