import io from 'socket.io-client';

const socketURL = 'http://localhost:5000';

class SocketManager {
 constructor(){
   this.socket='';
   this.socketFile='';
   this.connectedSocket='';
   this.uploader='';
 }
 getSocket = () => {
   return this.socket;
 }
 initSocket = (chatId) => {
   this.socket = io(`${socketURL}/${chatId}`);
   console.log('SOCKET', this.socket);
 }
}

let socketManager = new SocketManager();
export default socketManager;