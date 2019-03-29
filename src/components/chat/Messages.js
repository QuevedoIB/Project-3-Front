import { Component } from "react";
import React from "react";

class Messages extends Component {

  renderMessage(message) {
    return (
      <li>

        <div className="Message-content">

          <div className="text">{message.text}</div>
        </div>
      </li>
    );
  }
  render() {
    const { messages } = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }
}

export default Messages;