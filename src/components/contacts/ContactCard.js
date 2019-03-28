import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ContactCard extends Component {
  render() {
    const { imageUrl, username, quote, _id } = this.props.contact;
    return (
      <div>
        <img src={imageUrl} alt={username} />
        <div>
          <Link to={`/contact/${_id}`}><h3>{username}</h3></Link>
          <p>{quote}</p>
        </div>
        <div>
          <Link to={`/chat/${_id}`}>Chat</Link>
        </div>
        <button onClick={() => {
          this.props.deleteContact(this.props.userId, _id)
          this.props.updateContacts()
        }}>Delete Contact</button>
      </div>
    )
  }
}
