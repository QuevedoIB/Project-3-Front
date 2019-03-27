import React, { Component } from 'react'
import userService from '../lib/user-service';
import ContactCard from '../contacts/ContactCard';
import { withAuth } from '../providers/AuthProvider';

class Contacts extends Component {

  state = {
    contacts: [],
    text: '',
  }

  componentDidMount = async () => {
    try {
      const contacts = await userService.getContacts();
      this.setState({
        contacts
      })
    } catch (err) {
      console.log(err)
    }
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

  render() {

    const { contacts, text } = this.state;
    const filteredContacts = contacts.filter(contact => contact.name.includes(text));

    return (
      <section>
        <input value={text} type='text' placeholder='Search User' onChange={this.onChange}></input>
        <ul>
          {filteredContacts.map(contact => {
            return <li key={contact.id}>
              <ContactCard contact={contact} onDelete={this.handleDelete} />
            </li>
          })}
        </ul>
      </section>
    )
  }
}

export default withAuth(Contacts);