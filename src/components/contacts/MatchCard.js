import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MatchCard extends Component {
  render() {
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
          <button onClick={this.props.acceptMatch(_id)}>Accept</button>
          <button onClick={this.props.declineMatch(_id)}>Decline</button>
=======
          <button onClick={() => this.props.acceptMatch(_id)}>Accept</button>
          <button onClick={() => this.props.declineMatch(_id)}>Decline</button>
>>>>>>> 876a912dc5ea90a228f6fc137a970e8a410058f7
        </div>
      </div>
    )
  }
}
