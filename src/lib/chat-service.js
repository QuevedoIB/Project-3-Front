import axios from 'axios';

class ChatService {
  constructor() {
    this.chat = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true,
    })
  }

  createChat(contactId) {

    return this.chat.post('/chat/create', { contactId })
      .then(({ data }) => data);
  }

  getChat(contactId) {
    return this.chat.get(`/chat/${contactId}`)
      .then(response => response.data)
  }

  sendMessage(id, message, date) {
    return this.chat.post('/chat/send-message', { id, message, date })
      .then(({ data }) => data);
  }

  updateNumberMessages(chatId, numberMessages) {
    return this.chat.post('/chat/update-number-messages', { chatId, numberMessages })
      .then(({ data }) => data);
  }

  enableImageRequest(id, contactId) {
    return this.chat.post('/chat/enable-images-request', { id, contactId })
      .then(({ data }) => data);
  }

  enableImageDeclineRequest(id) {
    return this.chat.post('/chat/decline-request', { id })
      .then(({ data }) => data);
  }

  enableImageAcceptRequest(id) {
    return this.chat.post('/chat/accept-request', { id })
      .then(({ data }) => data);
  }

  disableImageRequest(id) {
    return this.chat.post('/chat/disable-images-request', { id })
      .then(({ data }) => data);
  }

  onTyping(chatId, userTypingId) {

    return this.chat.post('/chat/on-typing', { chatId, userTypingId })
      .then(({ data }) => data);
  }

  // onStopTyping(chatId) {
  //   return this.chat.post('/chat/on-typing-stop', { chatId })
  //     .then(({ data }) => data);
  // }
}


const chatService = new ChatService();

export default chatService;