import React, { Component } from 'react';
import { withContacts } from '../../providers/ContactProvider';
import { withAuth } from '../../providers/AuthProvider';
import '../components-scss/SearchCard.scss';

class SearchCard extends Component {

  getPersonalityCoincidence() {
    const personalityUser = this.props.user.personality;
    const personalityCard = this.props.userCard.personality;
    let counter = 0;
    personalityUser.forEach((p) => {
      if (personalityCard.includes(p)) {
        counter++;
      }
    })
    const coincidence = counter * 10;

    return (
      <p>Personality coincidence: {coincidence}%</p>
    );
  }

  render() {
    const { username, quote, interests } = this.props.userCard;
    const location = this.props.userCard.location.name;
    return (
      <div id='search-contact-info'>
        <div className='search-card-head'>
          <div>{this.getPersonalityCoincidence()}</div>
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
