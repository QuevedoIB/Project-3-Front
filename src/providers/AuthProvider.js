import React, { Component } from 'react';
import authService from '../lib/auth-service';

export const AuthContext = React.createContext(
  // authStore // default value
);

const { Provider, Consumer } = AuthContext;

export const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <Consumer>
          {(authStore) => {
            return <Comp
              isLogged={authStore.isLogged}
              user={authStore.user}
              logout={authStore.logout}
              login={authStore.login}
              signup={authStore.signup}
              editUser={authStore.editUser}
              isError={authStore.isError}
              onErrorSolved={authStore.onErrorSolved}
              {...this.props} />
          }}
        </Consumer>
      )
    }
  }
}

export default class AuthProvider extends Component {
  state = {
    isLogged: false,
    user: {},
    status: 'loading',
    isError: false,
  }

  setUser = (user) => {
    this.setState({
      isLogged: true,
      user,
    })
  }

  logoutUser = () => {
    return authService.logout()
      .then(() => {
        this.setState({
          isLogged: false,
          user: {},
        });
      })
      .catch(error => console.log(error))
  }

  loginUser = (body) => {
    return authService.login(body)
      .then((user) => {
        this.setUser(user);
      })
      .catch(this.setState({
        isError: true,
      }))
  }

  signupUser = (body) => {
    return authService.signup(body)
      .then((user) => {
        this.setUser(user);
      })
      .catch(error => console.log(error))
  }

  editUser = (body) => {
    return authService.editUser(body)
      .then((user) => {
        this.setUser(user);
      })
      .catch(this.setState({
        isError: true,
      }))
  }

  onErrorSolved = () => {
    this.setState({
      isError: false,
    })
  }

  componentDidMount() {
    authService.me()
      .then((user) => {
        this.setState({
          isLogged: true,
          user,
          status: 'loaded'
        })
      })
      .catch((error) => {
        this.setState({
          isLogged: false,
          user: {},
          status: 'loaded'
        });
      })
  }

  render() {
    const { isLogged, user, status } = this.state;
    const { children } = this.props;
    switch (status) {
      case 'loading':
        return <div>Loading</div>
      default:
        return (
          <Provider value={
            {
              isLogged,
              user,
              logout: this.logoutUser,
              login: this.loginUser,
              signup: this.signupUser,
              editUser: this.editUser,
              isError: this.state.isError,
              onErrorSolved: this.onErrorSolved,
            }}>
            {children}
          </Provider>
        );
    }
  }
}
