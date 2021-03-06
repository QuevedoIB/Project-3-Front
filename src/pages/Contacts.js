import React, { Component } from 'react'
import ContactCard from '../components/contacts/ContactCard';
import MatchCard from '../components/contacts/MatchCard';
import { withAuth } from '../providers/AuthProvider';
import { withContacts } from '../providers/ContactProvider';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import './pages-scss/contacts.scss';

class Contacts extends Component {

  state = {
    contacts: [],
    matches: [],
    text: '',
    showContacts: true,
  }

  buttonContactStyle = {
    backgroundImage: 'linear-gradient(-90deg, #ffffff, #fff5f5e8)',
    color: '#ff8080'
  }
  buttonMatchesStyle = {
    backgroundImage: 'linear-gradient(-90deg, #646464, #777777)',
    color: 'white'
  }

  componentDidMount() {

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

    try {

      await this.props.deleteContact(this.props.user.id, deletedContactId);
      this.props.getCurrentSession();

      this.setState({
        contacts: this.getContacts(),
      })

    } catch (err) {

    }
  }

  acceptMatch = (_id) => {
    this.props.acceptMatch(_id)
    this.getMatches();
    this.props.getCurrentSession();
  }


  getContacts = async () => {
    try {
      const contacts = await this.props.getContacts();


      if (contacts.length > 0) {
        this.setState({
          contacts,
        })
      }
    } catch (err) {
      console.log(err)
    }

    this.props.getCurrentSession();
  }

  getMatches = async () => {
    try {
      const matches = await this.props.getMatches();
      if (matches.length > 0) {
        this.setState({
          matches,
        })
      }

    } catch (err) {
      console.log(err)
    }

    this.props.getCurrentSession();
  }

  renderList = () => {
    const matches = this.renderListMatches();
    const contacts = this.renderListContacts();

    if (this.state.showContacts) {
      if (this.state.contacts.length > 0) {
        return contacts
      } else {
        return <p className="not-found">No contacts</p>
      }
    } else {
      if (this.state.matches.length > 0) {
        return matches
      } else {
        return <p className="not-found">No matches</p>
      }

    }
  }


  renderListMatches = () => {
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
  }

  renderListContacts = () => {

    const { contacts, text } = this.state;
    const filteredContacts = contacts.filter(contact => contact.username.includes(text));

    if (filteredContacts.length > 0) {
      const notificationsContacts = filteredContacts.map(contact => {
        contact.notification = false;
        if (contact.readMessages) {
          contact.readMessages.forEach(chat => {
            this.props.user.readMessages.forEach(userChatId => {
              if (chat.chatId === userChatId.chatId) {
                if (chat.numberMessages > userChatId.numberMessages) {
                  contact.notification = true;
                }
              }
            })
          })
        }
        return contact;
      });

      return notificationsContacts.sort((a, b) => a.username - b.username).sort((a, b) => {
        if (a.notification && !b.notification) {
          return -1;
        } else if (b.notification && !b.notification) {
          return 1;
        } else {
          return 0;
        }
      }).map(contact => <li key={contact._id}>
        <ContactCard contact={contact} deleteContact={this.props.deleteContact} userId={this.props.user._id} updateContacts={this.onChangeContacts} notification={contact.notification} />
      </li>)

    } else {
      return <></>
    }
  }

  showMatches = (e) => {
    if (this.state.showContacts) {
      this.setState({
        showContacts: false,
      })
    }
    this.buttonContactStyle = {
      backgroundImage: 'linear-gradient(-90deg, #646464, #777777)',
      color: 'white'
    }
    this.buttonMatchesStyle = {
      backgroundImage: 'linear-gradient(-90deg, #ffffff, #fff5f5e8)',
      color: '#ff8080'
    }

    this.getMatches();
  }

  showContacts = () => {
    if (!this.state.showContacts) {
      this.setState({
        showContacts: true,
      })
    }
    this.buttonContactStyle = {
      backgroundImage: 'linear-gradient(-90deg,#ffffff, #fff5f5e8)',
      color: '#ff8080'
    }
    this.buttonMatchesStyle = {
      backgroundImage: 'linear-gradient(-90deg, #646464, #777777)',
      color: 'white'
    }

    this.getContacts();

  }

  render() {

    const { text, matches } = this.state;

    return (
      <>
        <img src={process.env.PUBLIC_URL + '/images/bg-pages.png'} className="bg-image" alt='header' />
        <div className="contacts-header">
          <input value={text} type='text' placeholder='Search User' onChange={this.onChange} className="contacts-input"></input>
          <div className='contacts-buttons'>
            <button onClick={this.showContacts} className="contacts-button" style={this.buttonContactStyle}>Contacts</button>
            <div className='contacts-matches-button'>
              <button onClick={this.showMatches} className="contacts-button" style={this.buttonMatchesStyle}>Matches</button>{matches.length > 0 && <div className='notification'><p>{matches.length}</p></div>}
            </div>
          </div>
        </div>
        <ul className="contacts-list">
          {this.renderList()}
        </ul>
        <Navbar />
        <Link to='/profile' className="back-button"><img src={process.env.PUBLIC_URL + '/images/back.png'} alt="back" width="45px" /></Link>
      </>
    )
  }
}

export default withAuth(withContacts(Contacts));