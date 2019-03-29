import React, { Component } from 'react'
import InputChat from '../components/chat/InputChat';
import Chat from '../components/chat/Chat';
import chatService from '../lib/chat-service';
import { withRouter } from 'react-router-dom';
import socketManager from '../socketManager';

class ChatPage extends Component {

  state = {
    chatId: '',
    chat: [],
    contact: {},
    message: ''
  }

  componentDidMount(){
    this.handleGetChat();
    socketManager.initSocket(this.state.chatId);
    let socket = socketManager.getSocket();
    socket.on("NEW MESSAGE", () => {
      this.handleGetChat();
    });
  }

  handleGetChat = async () => {
    const chat = await chatService.getChat(this.props.match.params.id);

    this.setState({
      chatId: chat._id,
      chat: chat.log,
      contact: chat.contact
    });
  }

  handleSendMessage = (message) => {
    chatService.sendMessage(this.state.chatId, message)
      .then((data) => {
        this.setState({
          message: "",
          chat: data,
        })
      })
  }


  render() {
    return (
      <div>
        CHAT
        < Chat handleSendMessage={this.handleSendMessage}/>
      </div >
    )
  }
}

export default withRouter(ChatPage);