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
    // loadingMatches: true,
    // loadingContacts: true,
    showContacts: true,
  }

  componentDidMount = () => {

    this.getContacts();
    this.getMatches();
  }

  onChangeContacts = (deletedId) => {

    const newContacts = this.state.contacts.filter(e => e._id !== deletedId);
    this.setState({ contacts: newContacts })

  }

  onChangeMatches = (match, acceptedBool) => {
    const newMatches = this.state.matches.filter(e => e._id !== match._id);
    if (acceptedBool) {
      this.setState({
        matches: newMatches,
        contacts: [match, ...this.state.contacts]
      })
    } else {
      this.setState({
        matches: newMatches,
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

  acceptMatch = (_id) => {
    this.props.acceptMatch(_id)
    this.getMatches();
  }


  getContacts = async () => {
    try {
      const contacts = await this.props.getContacts();

      if (contacts.length > 0) {
        this.setState({
          contacts,
          //loadingContacts: false
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
          //loadingMatches: false
        })
      }

    } catch (err) {
      console.log(err)
    }
  }

  renderList = () => {
    const matches = this.renderListMatches();
    const contacts = this.renderListContacts();

    if (this.state.showContacts) {
      if (this.state.contacts.length > 0) {
        return contacts
      } else {
        return <p>No contacts</p>
      }
    } else {
      if (this.state.matches.length > 0) {
        return matches
      } else {
        return <p>No matches</p>
      }

    }
  }


  renderListMatches = () => {
    //if (!this.state.loadingMatches) {
    const { matches, text } = this.state;
    const filteredMatches = matches.filter(match => match.username.includes(text));

    if (filteredMatches.length > 0) {
      return filteredMatches.map(match => {
        return <li key={match._id}>
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

    //}
  }
  //cambiar on delete
  renderListContacts = () => {
    //if (!this.state.loadingContacts) {
    console.log('RENDER CONTACTS')
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

    //}
  }

  showMatches = () => {
    if (this.state.showContacts) {
      this.setState({
        showContacts: false,
      })
    }
  }

  showContacts = () => {
    if (!this.state.showContacts) {
      this.setState({
        showContacts: true,
      })
    }
  }

  render() {
    console.log('RENDER ', this.state.contacts)
    const { text, matches } = this.state;

    return (
      <section>
        <input value={text} type='text' placeholder='Search User' onChange={this.onChange}></input>
        <div class='contacts-buttons'>
          <button onClick={this.showContacts}>Show contacts</button>
          <div className='contacts-matches-button'>
            <button onClick={this.showMatches}>Show matches</button><div className='notifications'>{matches.length}</div>
          </div>
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