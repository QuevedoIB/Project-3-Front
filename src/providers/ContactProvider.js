import React, { Component } from 'react';
import userService from '../lib/user-service';
import authService from '../lib/auth-service';

export const ContactContext = React.createContext(
  // authStore // default value
);

const { Provider, Consumer } = ContactContext;

export const withContacts = (Comp) => {
  return class withContacts extends Component {
    render() {
      return (
        <Consumer>
          {(contactStore) => {
            return <Comp
              isLogged={contactStore.isLogged}
              user={contactStore.user}
              getUsers={contactStore.getUsers}
              {...this.props} />
          }}
        </Consumer>
      )
    }
  }
}

export default class ContactProvider extends Component {
  state = {
    isLogged: false,
    user: {},
    status: 'loading'
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

  getUsers = () => {
    return userService.getUsers()
      .then((users) => users)
      .catch(error => console.log(error))
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
              getUsers: this.getUsers,
            }}>
            {children}
          </Provider>
        );
    }
  }
}