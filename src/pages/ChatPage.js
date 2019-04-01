import React, { Component } from 'react'
import Chat from '../components/chat/Chat';
import chatService from '../lib/chat-service';
import { withRouter, Link } from 'react-router-dom';
import socketManager from '../socketManager';
import { scrollToBottom } from '.././lib/helpers/scroll-chat-down';
import { translateMessage, languagesArray } from '.././lib/helpers/get-languages';
import Navbar from '../components/navbar/Navbar';

class ChatPage extends Component {

  state = {
    chatId: '',
    chat: [],
    contact: {},
    message: '',
    languagesList: languagesArray,
    language: '',
  }

  componentDidMount = async () => {
    await this.handleGetChat();
    await socketManager.initSocket(this.state.chatId);
    let socket = socketManager.getSocket();
    socket.on("NEW_MESSAGE", () => {

      this.handleGetChat();
    });
  }

  handleLanguageSelect = (e) => {
    e.preventDefault();
    this.setState({
      language: e.target.value,
    })
  }

  handleGetChat = async () => {
    const chat = await chatService.getChat(this.props.match.params.id);
    await this.setState({
      chatId: chat._id,
      chat: chat.log,
      contact: chat.contact
    });
    scrollToBottom();
  }

  handleSendMessage = async (message) => {
    const { language } = this.state;

    let chatData;

    if (language) {
      const messageTranslated = await translateMessage(message, language);
      //let messageToSend = messageTranslated[0]

      chatData = await chatService.sendMessage(this.state.chatId, messageTranslated);
    } else {
      chatData = await chatService.sendMessage(this.state.chatId, message);
    }

    // const messageReceived = await translateMessage(message, language);

    // const chatData = await chatService.sendMessage(this.state.chatId, translatedMessage);

    await this.setState({
      message: '',
      chat: chatData,
    })

    let socket = socketManager.getSocket();
    socket.on("NEW_MESSAGE", () => {
      this.handleGetChat();
    });

    // scrollToBottom();
  }

  onBack = () => {
    this.props.history.goBack();
  }


  render() {
    return (
      <div>
        <img className='bg-image' src={process.env.PUBLIC_URL + '/images/bg-chat.png'} alt='profile'></img>
        <div className="contact-header">
          <form>
            <select onChange={this.handleLanguageSelect}>
              {this.state.languagesList.map(language => {
                return <option key={language.short} value={language.short}>{language.language}</option>
              })}
            </select>
          </form>
          <img src={this.state.contact.imageUrl} alt={this.state.contact.username} />
          <h1>{this.state.contact.username}</h1>
        </div>
        < Chat handleSendMessage={this.handleSendMessage} chat={this.state.chat} contact={this.state.contact} />
        <Link to='/contacts' className="back-button"><img src={process.env.PUBLIC_URL + '/images/back.png'} alt="back" width="45px"/></Link>
      </div >
    )
  }
}

export default withRouter(ChatPage);