import React, { Component } from 'react'
import userService from '../lib/user-service';
import ContactCard from '../components/contacts/ContactCard';
import { withAuth } from '../providers/AuthProvider';

class Contacts extends Component {

  state = {
    contacts: [],
    invitations:[],
    text: '',
  }

  componentDidMount = () => {
    this.getContacts();
  }

  onChange = (event) => {
    this.setState({
      text: event.target.value,
    })
  }

  handleDelete = async (deletedContactId) => {

    const newContacts = this.state.contacts.filter(contact => contact.id !== deletedContactId);

    try {

      await userService.deleteContact(this.props.user.id, deletedContactId);

      this.setState({
        contacts: newContacts,
      })

    } catch (err) {

    }
  }

  getContacts = async() =>{
    try {
      const contacts = await userService.getContacts(this.props.user._id);
      this.setState({
        contacts
      })
    } catch (err) {
      console.log(err)
    }
  }

  renderList() {
    const invitations = this.renderListInvitations();
    const contacts = this.renderListContacts();

    console.log(contacts);
    if (this.state.contacts.length === 0 && this.state.invitations.length === 0) {
      return <p>No contacts</p>
    } else {
      return (<>
      {invitations}
      {contacts}
      </>);
    }
  }

  renderListInvitations() {

  }

  renderListContacts() {
    const { contacts, text } = this.state;
    const filteredContacts = contacts.filter(contact => contact.name.includes(text));

    return filteredContacts.map(contact => {
      return <li key={contact.id}>
        <ContactCard contact={contact} onDelete={this.handleDelete} />
      </li>
    })

  }



  render() {

    const { contacts, text } = this.state;
    // const filteredContacts = contacts.filter(contact => contact.name.includes(text));

    return (
      <section>
        <input value={text} type='text' placeholder='Search User' onChange={this.onChange}></input>
        <ul>
          {this.renderList()}
        </ul>
      </section>
    )
  }
}

export default withAuth(Contacts);