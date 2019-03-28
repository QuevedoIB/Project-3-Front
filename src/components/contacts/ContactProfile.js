import React, { Component } from 'react'

export default class ContactProfile extends Component {
  renderInterests(){
    return this.props.contact.interests.map(e=>{
      return <li>e</li>
    });
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
      </div>
    )
  }
}
