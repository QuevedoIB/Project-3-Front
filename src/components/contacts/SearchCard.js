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
      <span>Personality coincidence: {coincidence}%</span>
    );
  }

  render() {
    const { username, quote, interests } = this.props.userCard;
    const location = this.props.userCard.location.name;
    return (
      <div id='search-contact-info'>
        <div className='search-card-head'>
          <h2>{username}</h2>
          <h5 className='search-card-quote'>{quote}</h5>
          <p><img src={process.env.PUBLIC_URL + '/images/brain.png'} alt="brain" width="20px" />{this.getPersonalityCoincidence()}</p>
          <p><img src={process.env.PUBLIC_URL + '/images/location.png'} alt="location" width="20px" />{location}</p>
        </div>
        <ul className="search-interests-list">
          {interests.map((e, index) => <li className='search-interests-li' key={`${e}${index}`}><span>{e}</span></li>)}
        </ul>
      </div>
    )
  }
}

export default withAuth(withContacts(SearchCard));
