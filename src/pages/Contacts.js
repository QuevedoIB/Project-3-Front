import React, { Component } from 'react'
import ContactCard from '../components/contacts/ContactCard';
import MatchCard from '../components/contacts/MatchCard';
import { withAuth } from '../providers/AuthProvider';
import { withContacts } from '../providers/ContactProvider';
import { Link } from 'react-router-dom';

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

      if (contacts.length > 0) {
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

      if (matches.length > 0) {
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
    const filteredMatches = matches.filter(match => match.username.includes(text));

    if (filteredMatches) {
      return filteredMatches.map((match, index) => {
        return <li key={`${match}${index}`}>
          <MatchCard match={match}
            acceptMatch={this.props.acceptMatch}
            declineMatch={this.props.declineMatch}
          />
        </li>
      })

    } else {
      return <></>
    }

  }
  //cambiar on delete
  renderListContacts() {
    const { contacts, text } = this.state;
    const filteredContacts = contacts.filter(contact => contact.username.includes(text));
    if (filteredContacts) {
      return filteredContacts.map((contact, index) => {
        return <li key={`${contact._id}${index}`}>
          <ContactCard contact={contact} deleteContact={this.props.deleteContact} />
        </li>
      })

    } else {
      return <></>
    }

  }

  render() {

    const { text } = this.state;

    return (
      <section>
        <input value={text} type='text' placeholder='Search User' onChange={this.onChange}></input>
        <ul>
          {this.renderList()}
        </ul>
        <Link to='/profile' >Back to Profile</Link>
      </section>
    )
  }
}

export default withAuth(withContacts(Contacts));