import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../components-scss/ContactProfile.scss';
import { withAuth } from '../../providers/AuthProvider';
import Report from '../report/Report';
import Spinner from '../loading/Spinner';

class ContactProfile extends Component {

  state = {
    isLoading: true,
  }

  componentDidMount = () => {

    if (!this.props.contact.contacts.includes(this.props.user._id)) {
      this.props.history.push('/profile');
    }

    this.setState({ isLoaded: false })
  }

  renderInterests() {
    return this.props.contact.interests.map((e, index) => {
      return <li key={`${e}${index}`}><span>{e}</span></li>
    });
  }

  onBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { username, imageUrl, quote, _id } = this.props.contact;
    const { isLoading } = this.state;
    return !isLoading ? <Spinner /> : <div className="contact-profile">
      <div className="contact-header">
        <Report clickAction={() => { this.props.reportUser(_id); this.props.history.push('/profile') }} username={username} />
        {/* <button onClick={() => { this.props.reportUser(_id); this.props.history.push('/profile') }}>Report</button> */}
        <img src={imageUrl} alt={imageUrl} />
        <h1>{username}</h1>
      </div>
      <div className="contact-text">
        <h3>About {username}</h3>
        <p className="contact-quote">{quote}</p>
        <h3>Interests</h3>
        <ul className="interests-list">
          {this.renderInterests()}
        </ul>
      </div>
    </div>
  }
}

export default withAuth(withRouter(ContactProfile));