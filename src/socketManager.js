import io from 'socket.io-client';

const socketURL =  process.env.REACT_APP_BACKEND_URL;

class SocketManager {
  constructor() {
    this.socket = '';
    this.socketFile = '';
    this.connectedSocket = '';
    this.uploader = '';
  }
  getSocket = () => {
    return this.socket;
  }
  initSocket = (chatId) => {
    this.socket = io(`${socketURL}/${chatId}`);
  }
}

let socketManager = new SocketManager();
export default socketManager;