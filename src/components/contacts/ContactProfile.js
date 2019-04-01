import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../components-scss/ContactProfile.scss';



class ContactProfile extends Component {
  renderInterests() {
    return this.props.contact.interests.map((e, index) => {
      return <li key={`${e}${index}`}><span>{e}</span></li>
    });
  }

  onBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { username, imageUrl, quote } = this.props.contact;

    return (

      <div className="contact-profile">
        <div className="contact-header">
          <img src={imageUrl} alt={imageUrl} />
          <h1>{username}</h1>
        </div>
        <div className="contact-text">
          <h3>About {username}</h3>
          <p>"{quote}"</p>
          <h3>Interests</h3>
          <ul className="interests-list">
            {this.renderInterests()}
          </ul>
          <button onClick={this.onBack} className="back-button">Back</button>
        </div>
      </div>

    )
  }
}

export default withRouter(ContactProfile);