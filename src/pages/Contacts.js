import React, { Component } from 'react'
import ContactCard from '../components/contacts/ContactCard';
import { withAuth } from '../providers/AuthProvider';
import { withContacts } from '../providers/ContactProvider';

class Contacts extends Component {

  state = {
    contacts: [],
    matches: [],
    text: '',
  }

  componentDidMount = () => {
    this.getContacts();
    this.getMatches();
  }

  onChange = (event) => {
    this.setState({
      text: event.target.value,
    })
  }

  handleDelete = async (deletedContactId) => {

    const newContacts = this.state.contacts.filter(contact => contact.id !== deletedContactId);

    try {

      await this.props.deleteContact(this.props.user.id, deletedContactId);

      this.setState({
        contacts: newContacts,
      })

    } catch (err) {

    }
  }

  getContacts = async () => {
    try {
      const contacts = await this.props.getContacts();
      if (contacts) {
        this.setState({
          contacts
        })
      }

    } catch (err) {
      console.log(err)
    }
  }

  getMatches = async () => {
    try {
      const matches = await this.props.getMatches();
      if (matches) {
        this.setState({
          matches
        })
      }

    } catch (err) {
      console.log(err)
    }
  }

  renderList() {
    const matches = this.renderListMatches();
    const contacts = this.renderListContacts();

    console.log(contacts);
    if (this.state.contacts.length === 0 && this.state.matches.length === 0) {
      return <p>No contacts</p>
    } else {
      return (<>
        {matches}
        {contacts}
      </>);
    }
  }

  renderListMatches() {
    const { matches, text } = this.state;
    const filteredMatches = matches.filter(match => match.name.includes(text));

    return filteredMatches.map(match => {
      return <li key={match.id}>
        <ContactCard match={match} />
      </li>
    })
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

export default withAuth(withContacts(Contacts));