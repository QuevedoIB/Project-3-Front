import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ContactCard extends Component {
  render() {
    const { imageUrl, username, quote, id } = this.props.contact;
    return (
      <div>
        <img src={imageUrl} alt={username} />
        <div>
          <h3>{username}</h3>
          <p>{quote}</p>
        </div>
        <div>
          <Link to={`/chat/${id}`}>Chat</Link>
          <Link to={`/contact/${id}`}>Profile</Link>
        </div>
        <button onClick={this.props.onDelete(id)}>Delete Match</button>
      </div>
    )
  }
}
