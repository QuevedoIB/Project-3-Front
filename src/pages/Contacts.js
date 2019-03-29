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
    loadingMatches: true,
    loadingContacts: true
  }

  componentDidMount = () => {

    this.getContacts();
    this.getMatches();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      this.setState({

      })
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

      await this.props.deleteContact(this.props.user.id, deletedContactId);
      
      this.setState({
        contacts: this.getContacts(),
      })

    } catch (err) {

    }
  }

  acceptMatch = (_id) =>{
    this.props.acceptMatch(_id)
    this.getMatches();
  }
  

  getContacts = async () => {
    try {
      const contacts = await this.props.getContacts();

      if (contacts.length > 0) {
        this.setState({
          contacts,
          loadingContacts: false
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
          matches,
          loadingMatches: false
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
    if (!this.state.loadingMatches) {
      const { matches, text } = this.state;
      const filteredMatches = matches.filter(match => match.username.includes(text));

      if (filteredMatches.length > 0) {
        return filteredMatches.map(match => {
          return <li key={match.id}>
            <MatchCard match={match}
              acceptMatch={this.acceptMatch}
              declineMatch={this.props.declineMatch}
            />
          </li>
        })

      } else {
        return <></>
      }

    }
  }
  //cambiar on delete
  renderListContacts() {
    if (!this.state.loadingContacts) {
      const { contacts, text } = this.state;
      const filteredContacts = contacts.filter(contact => contact.username.includes(text));
      if (filteredContacts.length > 0) {
        return filteredContacts.map(contact => {
          return <li key={contact.id}>
            <ContactCard contact={contact} deleteContact={this.handleDelete} userId={this.props.user._id}/>
          </li>
        })

      } else {
        return <></>
      }

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