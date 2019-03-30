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
        CHAT
        < Chat handleSendMessage={this.handleSendMessage} chat={this.state.chat} contact={this.state.contact} />
      </div >
    )
  }
}

export default withRouter(ChatPage);