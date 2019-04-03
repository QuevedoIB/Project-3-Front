import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../components-scss/ContactCard.scss';


export default class MatchCard extends Component {
  render() {

    const { imageUrl, username, _id } = this.props.match;
    return (
      <div className="contact-card">
        <img src={imageUrl} alt={username} className="user-image" />
        <div className="contact-info">
          <Link to={`/contact/${_id}`} className="username"><h3>{username}</h3></Link>
        </div>
        <div className="button-container">
          <button onClick={() => {
            this.props.acceptMatch(_id)
            this.props.updateMatches(this.props.match, true)
          }}><img src={process.env.PUBLIC_URL + '/images/accept.png'} alt="accept" /></button>
        </div>
        <div className="button-container">
          <button onClick={() => {
            this.props.declineMatch(_id)
            this.props.updateMatches(this.props.match, false)
          }}><img src={process.env.PUBLIC_URL + '/images/decline.png'} alt="decline" /></button>
        </div>
      </div>
    )
  }
}
