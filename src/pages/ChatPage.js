import React, { Component } from 'react'
import InputChat from '../components/chat/InputChat';
import Chat from '../components/chat/Chat';
import chatService from '../lib/chat-service';
import { withRouter } from 'react-router-dom';
import socketManager from '../socketManager';
import { scrollToBottom } from '.././lib/helpers/scroll-chat-down';

class ChatPage extends Component {

  state = {
    chatId: '',
    chat: [],
    contact: {},
    message: ''
  }

  componentDidMount = async () => {
    await this.handleGetChat();
    await socketManager.initSocket(this.state.chatId);
    let socket = socketManager.getSocket();
    socket.on("NEW_MESSAGE", () => {

      this.handleGetChat();
    });
  }

  handleGetChat = async () => {
    const chat = await chatService.getChat(this.props.match.params.id);
    await this.setState({
      chatId: chat._id,
      chat: chat.log,
      contact: chat.contact
    });
  }

  handleSendMessage = async (message) => {
    const chatData = await chatService.sendMessage(this.state.chatId, message)

    await this.setState({
      message: '',
      chat: chatData,
    })

    let socket = socketManager.getSocket();
    socket.on("NEW_MESSAGE", () => {
      this.handleGetChat();
    });

    scrollToBottom();
  }


  render() {
    return (
      <div>
        <img className='bg-image' src={process.env.PUBLIC_URL + '/images/bg-chat.png'} alt='profile'></img>
        <div className="contact-header">
          <img src={this.state.contact.imageUrl} alt={this.state.contact.username} />
          <h1>{this.state.contact.username}</h1>
        </div>
        < Chat handleSendMessage={this.handleSendMessage} chat={this.state.chat} contact={this.state.contact} />
      </div >
    )
  }
}

export default withRouter(ChatPage);