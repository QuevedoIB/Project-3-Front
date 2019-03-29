import React, { Component } from 'react'
import InputChat from '../components/chat/InputChat';
import Messages from '../components/chat/Messages';
export default class Chat extends Component {

  state = {
    messages: [
      {
        text: "This is a test message!",

      }
    ],

  }

  


  render() {
    return (
      <div>
        CHAT
        <Messages
          messages={this.state.messages}
        />
        <InputChat />
      </div>
    )
  }
}
