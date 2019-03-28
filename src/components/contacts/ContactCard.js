import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ContactCard extends Component {
  render() {
    const { imageUrl, username, quote, _id } = this.props.contact;
    return (
      <div>
        <img src={imageUrl} alt={username} />
        <div>
<<<<<<< HEAD
        <Link to={`/contact/${_id}`}><h3>{username}</h3></Link>
=======
          <Link to={`/contact/${id}`}><h3>{username}</h3></Link>
>>>>>>> 876a912dc5ea90a228f6fc137a970e8a410058f7
          <p>{quote}</p>
        </div>
        <div>
          <Link to={`/chat/${_id}`}>Chat</Link>
        </div>
<<<<<<< HEAD
        <button onClick={this.props.onDelete(_id)}>Delete Match</button>
=======
        <button onClick={() => this.props.deleteContact(id)}>Delete Match</button>
>>>>>>> 876a912dc5ea90a228f6fc137a970e8a410058f7
      </div>
    )
  }
}
