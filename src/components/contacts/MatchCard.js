import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MatchCard extends Component {
  render() {
    console.log(this.props)
    const { imageUrl, username, quote, _id } = this.props.match;
    return (
      <div>
        <img src={imageUrl} alt={username} />
        <div>
          <Link to={`/contact/${_id}`}><h3>{username}</h3></Link>
          <p>{quote}</p>
        </div>
        <div>
<<<<<<< HEAD
          <button onClick={() => {
            this.props.acceptMatch(_id)
            this.props.updateMatches(this.props.match, true)
          }}>Accept</button>
          <button onClick={() => {
            this.props.declineMatch(_id)
            this.props.updateMatches(this.props.match, false)
          }}>Decline</button>
=======
          <button onClick={this.props.acceptMatch(_id)}>Accept</button>
          <button onClick={() => this.props.declineMatch(_id)}>Decline</button>
>>>>>>> 00614986253033b5844cfeb61da8c5cca96bc68f
        </div>
      </div>
    )
  }
}
