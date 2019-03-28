import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PendingCard extends Component {
  render() {
    const { imageUrl, username, quote, id } = this.props.contact;
    return (
      <div>
        <img src={imageUrl} alt={username} />
        <div>
        <Link to={`/contact/${id}`}><h3>{username}</h3></Link>
          <p>{quote}</p>
        </div>
        <div>
          <p>Pending</p>
        </div>
      </div>
    )
  }
}
