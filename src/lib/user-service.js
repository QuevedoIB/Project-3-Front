import axios from 'axios';

class UserService {
  constructor() {
    this.users = axios.create({
      baseURL: 'http://localhost:5000',
      // withCredentials es para propagar las cookies
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true, // only beacause we want to share cookies with the backend server otherwise set it to false
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
  }

  getContacts(id) {
    return this.users.get(`${id}/contacts`)
      .then(response => response.data)
  }

  deleteContact(userId, contactId) {
    return this.users.post('/contacts/delete', { userId, contactId })
      .then(({ data }) => data);
  }

  // añadir id del user conectado en la petición para comprobar si son match como seguridad¿?
  getOneContact(meId, id) {
    return this.users.get(`${meId}/contact/${id}`)
      .then(({ data }) => data);
  }
}

const userService = new UserService();

export default userService;