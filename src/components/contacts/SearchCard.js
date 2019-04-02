import React, { Component } from 'react';
import { withContacts } from '../../providers/ContactProvider';
import '../components-scss/SearchCard.scss';
import { startDragControl } from '../../lib/helpers/drag-card';

class SearchCard extends Component {

  componentDidMount() {
    startDragControl();
  }

  render() {
    const { username, quote, interests } = this.props.user;
    const location = this.props.user.location.name;
    return (
      <div id='search-contact-info'>
        <div className='search-card-head'>
          <h2>{username}</h2>
          <p>{location}</p>
        </div>
        <p className='search-card-quote'>"{quote}"</p>
        <ul>
          {interests.map((e, index) => <li className='search-interests-li' key={`${e}${index}`}>{e}</li>)}
        </ul>
      </div>
    )
  }
}

export default withContacts(SearchCard);
