import React, { Component } from 'react'

export default class ContactProfile extends Component {
  render() {
    const { username, imageUrl, quote, email, personality } = this.props.contact;

    return (
      <h1>Es necesaria esta vista?¿ {username} </h1>
    )
  }
}
