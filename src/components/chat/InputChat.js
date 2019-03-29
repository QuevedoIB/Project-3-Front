import React, { Component } from 'react'

export default class InputChat extends Component {
  render() {
    return (
      <div>
        <input placeholder="Write a message"></input>
        <button>Send</button>
      </div>
    )
  }
}
