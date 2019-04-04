import React, { Component } from 'react';
import userService from '../lib/user-service';

export const ContactContext = React.createContext();

const { Provider, Consumer } = ContactContext;

export const withContacts = (Comp) => {
  return class withContacts extends Component {
    render() {
      return (
        <Consumer>
          {(contactStore) => {
            return <Comp
              getUsers={contactStore.getUsers}
              matchUser={contactStore.matchUser}
              getContacts={contactStore.getContacts}
              getMatches={contactStore.getMatches}
              deleteContact={contactStore.deleteContact}
              getOneContact={contactStore.getOneContact}
              declineMatch={contactStore.declineMatch}
              acceptMatch={contactStore.acceptMatch}
              {...this.props} />
          }}
        </Consumer>
      )
    }
  }
}

export default class ContactProvider extends Component {


  getUsers = () => {
    return userService.getUsers()
      .then((users) => users)
      .catch(error => console.log(error))
  }

  getContacts = () => {
    return userService.getContacts()
      .then((users) => users)
      .catch(error => console.log(error))
  }

  getOneContact = (id) => {
    return userService.getOneContact(id)
      .then((user) => user)
      .catch(error => console.log(error))
  }

  getMatches = () => {
    return userService.getMatches()
      .then((users) => users)
      .catch(error => console.log(error))
  }

  deleteContact = (userId, contactId) => {
    return userService.deleteContact(userId, contactId)
      .then((user) => user)
      .catch(error => console.log(error))
  }

  matchUser = (body) => {
    return userService.matchUser(body)
      .then((user) => user)
      .catch(error => console.log(error))
  }

  acceptMatch = (id) => {

    return userService.acceptMatch(id)
      .then((user) => user)
      .catch(error => console.log(error))
  }

  declineMatch = (id) => {
    return userService.declineMatch(id)
      .then((user) => user)
      .catch(error => console.log(error))
  }

  render() {
    const { children } = this.props;

    return (
      <Provider value={
        {

          getUsers: this.getUsers,
          getContacts: this.getContacts,
          getMatches: this.getMatches,
          deleteContact: this.deleteContact,
          matchUser: this.matchUser,
          getOneContact: this.getOneContact,
          acceptMatch: this.acceptMatch,
          declineMatch: this.declineMatch,
        }}>
        {children}
      </Provider>
    );
  }
}
