import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MatchCard extends Component {
  render() {
    const { imageUrl, username, quote, id } = this.props.match;
    return (
      <div>
        <img src={imageUrl} alt={username} />
        <div>
          <Link to={`/contact/${id}`}><h3>{username}</h3></Link>
          <p>{quote}</p>
        </div>
        <div>
          <button onClick={this.props.acceptMatch(id)}>Accept</button>
          <button onClick={this.props.declineMatch(id)}>Decline</button>
        </div>
      </div>
    )
  }
}
