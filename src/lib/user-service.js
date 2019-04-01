import axios from 'axios';

class UserService {
  constructor() {
    this.users = axios.create({
      baseURL: 'http://localhost:5000',
      // withCredentials es para propagar las cookies
      //baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true, // only beacause we want to share cookies with the backend server otherwise set it to false
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
  }

  getContacts() {
    return this.users.get(`/profile/contacts`)
      .then(response => response.data)
  }

  getMatches() {
    return this.users.get(`/profile/matches`)
      .then(response => response.data)
  }

  deleteContact(userId, contactId) {

    return this.users.post('/profile/contact/delete', { userId, contactId })
      .then(({ data }) => data);
  }

  // añadir id del user conectado en la petición para comprobar si son match como seguridad¿?
  getOneContact(id) {
    return this.users.get(`/profile/contact/${id}`)
      .then(({ data }) => data);
  }

  getUsers() {
    return this.users.get(`/api/users`)
      .then(({ data }) => {
        return data
      });
  }

  matchUser(id) {
    return this.users.post('/api/send-match', { id })
      .then(({ data }) => data);
  }

  acceptMatch(id) {

    return this.users.post(`/profile/add-contact/${id}`)
      .then(({ data }) => data);
  }

  declineMatch(id) {

    return this.users.post(`/profile/decline-contact/${id}`)
      .then(({ data }) => data);
  }
}

const userService = new UserService();

export default userService;