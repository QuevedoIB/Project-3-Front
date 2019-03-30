import { Component } from "react";
import React from "react";

class Messages extends Component {

  renderMessage(message) {
    return (
      <li>
        <div className="Message-content">
          <div className="text">{message}</div>
        </div>
      </li>
    );
  }
  render() {
    const { chat } = this.props;
    return (
      <ul className="Messages-list">
        {chat.map(m => this.renderMessage(m))}
      </ul>
    );
  }
}

export default Messages;