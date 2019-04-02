import React, { Component } from 'react';
import { withContacts } from '../../providers/ContactProvider';
import { withAuth } from '../../providers/AuthProvider';
import '../components-scss/SearchCard.scss';
import { startDragControl } from '../../lib/helpers/drag-card';

class SearchCard extends Component {

  componentDidMount() {
    startDragControl();
  }

  getPersonalityCoincidence(){
    // console.log(this.state.user.personality);
    // console.log(this.user);
  }

  render() {
    const { username, quote, interests } = this.props.user;
    const location = this.props.user.location.name;
    return (
      <div id='search-contact-info'>
        <div className='search-card-head'>
        <p>{this.getPersonalityCoincidence()}</p>
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

export default withAuth(withContacts(SearchCard));
