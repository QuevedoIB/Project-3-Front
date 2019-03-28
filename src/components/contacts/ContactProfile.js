import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ContactProfile extends Component {
  renderInterests() {
    return this.props.contact.interests.map((e, index) => {
      return <li key={`${e}${index}`}>{e}</li>
    });
  }

  onBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { username, imageUrl, quote, interests } = this.props.contact;

    return (
      <div>
        <img src={imageUrl} alt={username} />
        <h1>{username}</h1>
        <p>{quote}</p>
        <ul>
          {this.renderInterests()}
        </ul>
        <button onClick={this.onBack}>Back</button>
      </div>
    )
  }
}

export default withRouter(ContactProfile);