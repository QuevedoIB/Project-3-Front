import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import chatService from '../../lib/chat-service';
import { withRouter } from 'react-router-dom';
import '../components-scss/ContactCard.scss';

class ContactCard extends Component {

  handleSubmit = async (e) => {
    e.preventDefault();
    await chatService.createChat(this.props.contact._id);
    this.props.history.push(`/chat/${this.props.contact._id}`)
  }

  render() {

    const { imageUrl, username, _id } = this.props.contact;
    return (
      <div className="contact-card">
        <img src={imageUrl} alt={username} className="user-image" />
        <div className="contact-info">
          <Link to={`/contact/${_id}`} className="text-link username"><h3>{username}</h3></Link>
        </div>
        <div className="button-container">
        <div className='notification-container' >
        {this.props.notification && <div className='notification-message'></div>}
          <form onSubmit={this.handleSubmit}>
            <button type="submit"><img src={process.env.PUBLIC_URL + '/images/chat.png'} alt="chat" /></button>
          </form>
          </div>
        </div>
        <div className="button-container">
          <button onClick={() => {
            this.props.deleteContact(this.props.userId, _id)
            this.props.updateContacts(_id)
          }}><img src={process.env.PUBLIC_URL + '/images/delete.png'} alt="delete" /></button>
        </div>
      </div>
    )
  }
}

export default withRouter(ContactCard);
