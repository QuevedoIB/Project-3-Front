import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import chatService from '../../lib/chat-service';
import { withRouter } from 'react-router-dom';

class ContactCard extends Component {

  handleSubmit = async (e) => {
    e.preventDefault();
    const createdChat = await chatService.createChat(this.props.contact._id);
    this.props.history.push(`/chat/${this.props.contact._id}`)
  }

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
          <form onSubmit={this.handleSubmit}>
            <button type="submit">Chat</button>
          </form>

        </div>
        <button onClick={() => {
          this.props.deleteContact(this.props.userId, _id)
          this.props.updateContacts(_id)
        }}>Delete Contact</button>
      </div>
    )
  }
}

export default withRouter(ContactCard);
