import React, { Component } from 'react';
import authService from '../lib/auth-service';
import Spinner from '../components/loading/Spinner';

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
              changeImage={authStore.changeImage}
              isError={authStore.isError}
              onErrorSolved={authStore.onErrorSolved}
              getGoogleSignUrl={authStore.getGoogleSignUrl}
              completeProfile={authStore.completeProfile}
              errorType={authStore.errorType}
              reportUser={authStore.reportUser}
              getCurrentSession={authStore.getCurrentSession}
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
    errorType: '',
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
      .catch(error => { this.setState({ errorType: error }) });

  }

  completeProfile = (body) => {
    return authService.completeProfile(body)
      .then(user => this.setUser(user))
      .catch(err => console.log(err));
  }

  getGoogleSignUrl = () => {
    return authService.getGoogleSignUpUrl()
      .then((url) => url)
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

  changeImage = (body) => {
    return authService.changeImage(body)
      .then((user) => {
        this.setUser(user);
      })
      .catch(this.setState({
        isError: true,
      }))
  }

  reportUser = (id) => {
    return authService.reportUser(id)
      .then((user) => {
        this.setUser(user);
      })
      .catch(error => console.log(error))
  }

  onErrorSolved = () => {
    this.setState({
      isError: false,
    })
  }

  componentDidMount = () => {
    this.getCurrentSession();
  }

  getCurrentSession = () => {
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
        return <Spinner />
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
              changeImage: this.changeImage,
              isError: this.state.isError,
              onErrorSolved: this.onErrorSolved,
              getGoogleSignUrl: this.getGoogleSignUrl,
              completeProfile: this.completeProfile,
              errorType: this.state.errorType,
              reportUser: this.reportUser,
              getCurrentSession: this.getCurrentSession,
            }}>
            {children}
          </Provider>
        );
    }
  }
}
