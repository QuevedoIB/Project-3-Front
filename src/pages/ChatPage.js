import React, { Component } from 'react'
import Chat from '../components/chat/Chat';
import chatService from '../lib/chat-service';
import { withRouter, Link } from 'react-router-dom';
import socketManager from '../socketManager';
import { scrollToBottom } from '.././lib/helpers/scroll-chat-down';
import { translateMessage, languagesArray } from '.././lib/helpers/get-languages';
import './pages-scss/chatPage.scss';
import { withAuth } from '../providers/AuthProvider';

class ChatPage extends Component {

  state = {
    chatId: '',
    chat: [],
    contact: {},
    message: '',
    languagesList: languagesArray,
    language: '',
    imagesStatus: false,
    imagesRequest: false,
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
      contact: chat.contact,
      imagesRequest: chat.enabledImagesRequest,
      imagesStatus: chat.enabledImages,
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
  }

  onBack = () => {
    this.props.history.goBack();
  }

  //COSAS TEST

  onEnableImagesClick = async (chatId, contactId) => {
    console.log(this.state.imagesStatus)

    if (this.state.imagesStatus) {
      await chatService.disableImageRequest(chatId);
      let socket = socketManager.getSocket();
      socket.on("ENABLE-IMAGES", () => {
        this.handleGetChat();
      });

    } else {
      await chatService.enableImageRequest(chatId, contactId);


      let socket = socketManager.getSocket();
      socket.on("ENABLE-IMAGES", () => {
        this.handleGetChat();
      });
    }
  }

  checkImagesRequestStatus = () => {

    if (this.state.imagesRequest.includes(this.props.user._id)) {
      return <div>
        <h1>ESTA LA PETICIÓN</h1>
        <button onClick={() => this.handleAcceptEnableImageRequest(this.state.chatId)}>Accept</button><button onClick={() => this.handleRejectEnableImageRequest(this.state.chatId)}>Decline</button>
      </div>
    }
  }

  handleRejectEnableImageRequest = async (id) => {

    await chatService.enableImageDeclineRequest(id);

    let socket = socketManager.getSocket();
    socket.on("ENABLE-IMAGES", () => {
      this.handleGetChat();
    });
  }

  handleAcceptEnableImageRequest = async (id) => {

    await chatService.enableImageAcceptRequest(id);

    let socket = socketManager.getSocket();
    socket.on("ENABLE-IMAGES", () => {
      this.handleGetChat();
    });
  }

  render() {
    const { chatId, contact, imagesStatus } = this.state;
    return (
      <div className="chat-page">
        <img className='bg-image' src={process.env.PUBLIC_URL + '/images/bg-chat.png'} alt='profile'></img>
        <div className="contact-header">
          {chatId && this.checkImagesRequestStatus()}
          <button onClick={() => this.onEnableImagesClick(chatId, contact._id)}>INVITE</button>
          <form>
            <select onChange={this.handleLanguageSelect} className="select-language">
              {this.state.languagesList.map(language => {
                return <option key={language.short} value={language.short}>{language.language}</option>
              })}
            </select>
          </form>
          {imagesStatus && <img src={this.state.contact.imageUrl} alt={this.state.contact.username} />}
          <h1>{this.state.contact.username}</h1>
        </div>
        < Chat handleSendMessage={this.handleSendMessage} chat={this.state.chat} contact={this.state.contact} />
        <Link to='/contacts' className="back-button"><img src={process.env.PUBLIC_URL + '/images/back.png'} alt="back" width="45px" /></Link>
      </div >
    )
  }
}

export default withAuth(withRouter(ChatPage));