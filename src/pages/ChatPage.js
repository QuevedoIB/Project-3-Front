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
    console.log(e.target.value);
    if (e.target.value !== "none") {
      this.setState({
        language: e.target.value,
      })
    }else{
      this.setState({
        language: '',
      })
    }
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
      console.log('translation');
      const messageTranslated = await translateMessage(message, language);

      chatData = await chatService.sendMessage(this.state.chatId, messageTranslated);
    } else {
      chatData = await chatService.sendMessage(this.state.chatId, message);
    }

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

  onEnableImagesClick = async (chatId, contactId) => {


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
      return <div className='chat-invite-image-box'>
        <h3>{this.state.contact.username}<br></br> wants to share images</h3>
        <button className='accept-decline-chat-invite-image' onClick={() => this.handleAcceptEnableImageRequest(this.state.chatId)}><img src={process.env.PUBLIC_URL + '/images/checked.png'} alt='accept-sharing'></img></button>
        <button className='accept-decline-chat-invite-image' onClick={() => this.handleRejectEnableImageRequest(this.state.chatId)}><img src={process.env.PUBLIC_URL + '/images/x-button .png'} alt='decline-sharing'></img></button>
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
    let imageContact = contact.imageUrl;
    if(!imagesStatus || contact.personalImage === '' || contact.personalImage === undefined ){
      imageContact = contact.imageUrl;
    }else{
      imageContact = contact.personalImage;
    }

    return (
      <div className="chat-page">
        <img className='bg-image' src={process.env.PUBLIC_URL + '/images/bg-chat.png'} alt='profile'></img>
        <div className="contact-header">
          <form className="translate-text">
            <label>Translate my messages to:</label>
            <select onChange={this.handleLanguageSelect} className="select-language">
              <option key="none-language" value="none">None</option>
              {this.state.languagesList.map(language => {
                return <option key={language.short} value={language.short}>{language.language}</option>
              })}
            </select>
          </form>
          <div className='chat-page-header'>
          <img src={imageContact} alt={this.state.contact.username} />
            {/* {imagesStatus && <img src={this.state.contact.imageUrl} alt={this.state.contact.username} />} */}
            <div className='chat-page-header-info'>
              <h1>{this.state.contact.username}</h1>
              <button className='chat-invite-image-button' onClick={() => this.onEnableImagesClick(chatId, contact._id)}>{imagesStatus ? "Don't Share Image" : 'Share Image'}</button>
              {chatId && this.checkImagesRequestStatus()}
            </div>
          </div>
        </div>
        < Chat handleSendMessage={this.handleSendMessage} chat={this.state.chat} contact={this.state.contact} />
        <Link to='/contacts' className="back-button"><img src={process.env.PUBLIC_URL + '/images/back.png'} alt="back" width="45px" /></Link>
      </div >
    )
  }
}

export default withAuth(withRouter(ChatPage));