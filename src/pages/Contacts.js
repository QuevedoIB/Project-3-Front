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
    loadingContacts: true,
    showMatches: true,
  }

  componentDidMount = () => {

    this.getContacts();
    this.getMatches();
  }

  onChangeContacts = () => {
    this.getContacts();
  }

  onChangeMatches = () => {
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

  renderList = () => {
    const matches = this.renderListMatches();
    const contacts = this.renderListContacts();

    if (this.state.showMatches) {
      if (this.state.matches.length > 0) {
        return matches
      } else {
        return <p>No matches</p>
      }
    } else {
      if (this.state.contacts.length > 0) {
        return contacts
      } else {
        return <p>No contacts</p>
      }
    }
  }


  renderListMatches = () => {
    if (!this.state.loadingMatches) {
      const { matches, text } = this.state;
      const filteredMatches = matches.filter(match => match.username.includes(text));

      if (filteredMatches.length > 0) {
        return filteredMatches.map(match => {
          return <li key={match.id}>
            <MatchCard match={match}
              acceptMatch={this.props.acceptMatch}
              declineMatch={this.props.declineMatch}
              updateMatches={this.onChangeMatches}
            />
          </li>
        })

      } else {
        return <></>
      }

    }
  }
  //cambiar on delete
  renderListContacts = () => {
    if (!this.state.loadingContacts) {
      const { contacts, text } = this.state;
      const filteredContacts = contacts.filter(contact => contact.username.includes(text));
      if (filteredContacts.length > 0) {
        return filteredContacts.map(contact => {
          return <li key={contact._id}>
            <ContactCard contact={contact} deleteContact={this.props.deleteContact} userId={this.props.user._id} updateContacts={this.onChangeContacts} />
          </li>
        })

      } else {
        return <></>
      }

    }
  }

  showMatches = () => {
    if (!this.state.showMatches) {
      this.setState({
        showMatches: true,
      })
    }
  }

  showContacts = () => {
    if (this.state.showMatches) {
      this.setState({
        showMatches: false,
      })
    }
  }

  render() {

    const { text } = this.state;

    return (
      <section>
        <input value={text} type='text' placeholder='Search User' onChange={this.onChange}></input>
        <div>
          <button onClick={this.showMatches}>Show matches</button>
          <button onClick={this.showContacts}>Show contacts</button>
        </div>
        <ul>
          {this.renderList()}
        </ul>
        <Link to='/profile' >Back to Profile</Link>
      </section>
    )
  }
}

export default withAuth(withContacts(Contacts));