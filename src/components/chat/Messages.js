import { Component } from "react";
import React from "react";
import './Messages.scss';
import { withAuth } from '../../providers/AuthProvider';

const meStyle = {
  background: '#d6d6d6',
  textAlign: 'right',
  width: '50vw'
}

const contactStyle = {
  background: '#ff9c9c',
  textAlign: 'left',
  width: '50vw'
}

const leftStyle = {
  display:'flex',
  justifyContent:'flex-start'
}

const rightStyle = {
  display:'flex',
  justifyContent:'flex-end'
}

class Messages extends Component {

  assignMessage(message) {
    if (message.user === this.props.user._id) {
      return meStyle;
    } else {
      return contactStyle;
    }
  }

  assignPosition(message) {
    if (message.user === this.props.user._id) {
      return rightStyle;
    } else {
      return leftStyle;
    }
  }

  renderMessage = (message) => {
    const messageStyle = this.assignMessage(message);
    const messagePosition = this.assignPosition(message);
    return (
      <li style={messagePosition} key={message._id}>
        <div className="message-content" style={messageStyle}>
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