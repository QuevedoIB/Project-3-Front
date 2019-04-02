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

  sendMessage(id, message) {
    return this.chat.post('/chat/send-message', { id, message })
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

  // getAllMessages(id){
  //   return this.chat.get(`/chat/${id}`)
  //     .then(response => response.data)
  // }
}


const chatService = new ChatService();

export default chatService;