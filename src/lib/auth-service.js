import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:5000',
      // withCredentials es para propagar las cookies
      //baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true, // only beacause we want to share cookies with the backend server otherwise set it to false
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
  }

  getGoogleSignUpUrl() {

    return this.auth.get('/auth/google-signup-url')
      .then(({ data }) => data);
  }

  completeProfile(object) {

    return this.auth.post('/auth/complete-profile', object)
      .then(({ data }) => data);

  }

  signup(user) {

    return this.auth.post('/auth/signup', user)
      .then(({ data }) => data);
  }

  login(user) {
    const { username, password } = user;
    return this.auth.post('/auth/login', { username, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post('/auth/logout', {})
      .then(response => response.data)
  }

  me(user) {
    return this.auth.get('/auth/me')
      .then(response => response.data)
  }

  editUser(user) {
    return this.auth.post('/profile/edit', user)
      .then(response => {

        return response.data
      })
  }

  reportUser(contactId) {

    return this.auth.post(`/profile/report`, { contactId })
      .then(({ data }) => data);
  }
}

const authService = new AuthService();

export default authService;
