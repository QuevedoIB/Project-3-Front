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
    typing: [],
    userTyping: false,
    otherUserTyping: false,
    newMessage: false
  }

  componentDidMount = async () => {
    await this.handleGetChat();
    await chatService.updateNumberMessages(this.state.chatId, this.state.chat.length);
    this.props.getCurrentSession();
    await socketManager.initSocket(this.state.chatId);


    let socket = socketManager.getSocket();

    socket.on("NEW_MESSAGE", () => {
      this.handleGetChat();
    });

    socket = socketManager.getSocket();
    socket.on("ENABLE-IMAGES", () => {
      this.handleGetChat();
    });



    // socket.on("TYPING", async (data) => {
    //   if (data.userTypingId === this.state.contact._id) {
    //     await this.setState({
    //       otherUserTyping: !this.state.otherUserTyping,
    //     })
    //   }
    // });
  }

  componentWillUnmount = async () => {

    await chatService.updateNumberMessages(this.state.chatId, this.state.chat.length);
    this.props.getCurrentSession();
    let socket = socketManager.getSocket();
    socket.disconnect();
    console.log('DISCONECT', this.state.chatId, this.state.chat.length);

  }

  onChangeInput = async (input) => {

    // const { userTyping, otherUserTyping } = this.state;

    // const { _id } = this.props.user;

    // let socket;


    // if (input.length && !userTyping) {

    //   this.setState({ userTyping: true })
    //   chatService.onTyping(this.state.chatId, _id);
    //   socketManager.getSocket()
    //   // socket = socketManager.getSocket()

    //   // socket.on("TYPING", async (data) => {

    //   //   if (data.userTypingId === this.state.contact._id) {
    //   //     await this.setState({
    //   //       otherUserTyping: !otherUserTyping,
    //   //     })
    //   //   }
    //   //   console.log(otherUserTyping, 'STAAAART')
    //   // })
    //   return;
    // }

    // if (!input.length && userTyping) {

    //   this.setState({
    //     userTyping: false,
    //   })

    //   chatService.onTyping(this.state.chatId, _id);
    //   socketManager.getSocket()
    //   // socket = socketManager.getSocket()
    //   // socket.on("TYPING", async (data) => {
    //   //   console.log('LEAVVE')
    //   //   if (data.userTypingId === this.state.contact._id) {
    //   //     await this.setState({
    //   //       otherUserTyping: !otherUserTyping,
    //   //     })
    //   //   }

    //   //   console.log(otherUserTyping)
    //   // })
    // }

    // console.log(otherUserTyping)
  }



  //   console.log(this.state.typing, 'ENTRAAA111111111111111A', this.state.userTyping)
  //     await this.setState({ typing: true })

  // chatService.onTyping(this.state.chatId, true);
  // socket = socketManager.getSocket()
  // // let socket = socketManager.getSocket();
  // socket.on("TYPING", (data) => {
  //   console.log('DATA ', data);
  //   if (!this.state.typing) {
  //     this.setState({ userTyping: data.userTypingId })
  //   }
  // });
  // console.log('AFTER CHAT SERVICE');

  //}

  // if (!input.length && this.state.typing) {
  //   console.log(this.state.typing, 'ENTRAAAA', this.state.userTyping)
  //   await this.setState({
  //     typing: false,
  //   })
  //   chatService.onTyping(this.state.chatId, false)
  //   socket = socketManager.getSocket();
  //   //let socket = socketManager.getSocket();
  //   socket.on("TYPING", (data) => {
  //     this.setState({ userTyping: data.userTyping })
  //   })

  // }

  // if (!input.length && this.state.typing) {
  //   console.log(this.state.typing, 'ENTRAAAA', this.state.userTyping)
  //   await this.setState({
  //     typing: false,
  //   })
  //   socket = socketManager.getSocket();
  //   //let socket = socketManager.getSocket();
  //   socket.on("STOP_TYPING", (data) => {
  //     this.setState({ userTyping: data.userTyping })
  //   })

  //   chatService.onStopTyping(this.state.chatId)
  // }
  //}

  handleLanguageSelect = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value !== "none") {
      this.setState({
        language: e.target.value,
      })
    } else {
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
    const { language, userTyping, otherUserTyping } = this.state;

    let chatData;
    let time = new Date();
    const dd = String(time.getDate()).padStart(2, '0');
    const mm = String(time.getMonth() + 1).padStart(2, '0');
    let hours = String(time.getHours());
    let minutes = String(time.getMinutes());

    if (minutes < 10) {
      minutes = `0${minutes}`;
    } else if (hours < 10) {
      hours = `0${hours}`;
    }

    time = `${hours}:${minutes} - ${dd}/${mm}`;

    console.log(time);

    if (language) {
      const messageTranslated = await translateMessage(message, language);

      chatData = await chatService.sendMessage(this.state.chatId, messageTranslated, time);
    } else {
      chatData = await chatService.sendMessage(this.state.chatId, message, time);
    }


    let socket = socketManager.getSocket();
    socket.on("NEW_MESSAGE", () => {
      this.handleGetChat();
    });

    
    
    console.log('NEW MESSAGE', this.state.newMessage);
    await this.setState({
      message: '',
      chat: chatData,
      userTyping,
      newMessage: true,
    })
    await chatService.updateNumberMessages(this.state.chatId, this.state.chat.length);
    this.props.getCurrentSession();
    
    console.log('LENGTH CHAT', this.state.chat.length);

    // chatService.onTyping(this.state.chatId, this.props.user._id);

    // socket.on("TYPING", (data) => {
    //   console.log('LEAVVE')
    //   if (data.userTypingId === this.state.contact._id) {
    //     this.setState({
    //       otherUserTyping: !otherUserTyping,
    //     })
    //   }
    // })
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
        <h3>{this.state.contact.username}<br></br> wants to share the real profile images</h3>
        <div className="buttons-share-image">
          <button className='accept-decline-chat-invite-image' onClick={() => this.handleAcceptEnableImageRequest(this.state.chatId)}><img src={process.env.PUBLIC_URL + '/images/checked.png'} alt='accept-sharing'></img></button>
          <button className='accept-decline-chat-invite-image' onClick={() => this.handleRejectEnableImageRequest(this.state.chatId)}><img src={process.env.PUBLIC_URL + '/images/x-button .png'} alt='decline-sharing'></img></button>
        </div>
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

    if (!imagesStatus || contact.personalImage === '' || contact.personalImage === undefined) {
      imageContact = contact.imageUrl;
    } else {
      imageContact = contact.personalImage;
    }

    const showImageStyle = {
      backgroundImage: `url(${imageContact})`
    }
    return (
      <div className="chat-page">
        <img className='bg-image' src={process.env.PUBLIC_URL + '/images/bg-chat.png'} alt='profile'></img>
        <div className="contact-header">
          <form className="translate-text">
            <label >Translate my messages to:</label>
            <select onChange={this.handleLanguageSelect} className="select-language">
              <option key="none-language" value="none">None</option>
              {this.state.languagesList.map(language => {
                return <option key={language.short} value={language.short}>{language.language}</option>
              })}
            </select>
          </form>
          <div className='chat-page-header'>
            <div className="image-holder" style={showImageStyle}></div>
            {/* <img src={imageContact} alt={this.state.contact.username} /> */}
            {/* {imagesStatus && <img src={this.state.contact.imageUrl} alt={this.state.contact.username} />} */}
            <div className='chat-page-header-info'>
              <h1>{this.state.contact.username}</h1>
              <button className='chat-invite-image-button' onClick={() => this.onEnableImagesClick(chatId, contact._id)}>{imagesStatus ? "Stop Sharing" : 'Share Images'}</button>
              {chatId && this.checkImagesRequestStatus()}
            </div>
          </div>
          {this.state.otherUserTyping && <h1>Typing...</h1>}
        </div>
        < Chat handleSendMessage={this.handleSendMessage} chat={this.state.chat} contact={this.state.contact} typing={this.onChangeInput} />
        <Link to='/contacts' className="back-button"><img src={process.env.PUBLIC_URL + '/images/back.png'} alt="back" width="45px" /></Link>
      </div >
    )
  }
}

export default withAuth(withRouter(ChatPage));