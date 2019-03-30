import { Component } from "react";
import React from "react";
import './Messages.css';
import { withAuth } from '../../providers/AuthProvider';

const meStyle = {
  background: 'gray',
  textAlign: 'right',
}

const contactStyle = {
  background: 'orange',
  textAlign: 'left'
}

class Messages extends Component {

  assignMessage(message) {
    if (message.user === this.props.user._id) {
      return meStyle;
    } else {
      return contactStyle;
    }
  }

  renderMessage = (message) => {
    const messageStyle = this.assignMessage(message);
    return (
      <li style={messageStyle} key={message._id}>
        <div className="Message-content">
          <div className="text">{message.text}</div>
          <p>{message.date}</p>
        </div>
      </li>
    );
  }
  render() {
    const { chat } = this.props;

    return (
      <ul className="messages-list">
        {chat.map(m => this.renderMessage(m))}
      </ul>
    );
  }
}

export default withAuth(Messages);