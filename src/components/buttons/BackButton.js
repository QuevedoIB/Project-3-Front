import React, { Component } from 'react'

export default class BackButton extends Component {
  render() {
    return (
      <div>
        <Link to='/profile' className="back-button"><img src={process.env.PUBLIC_URL + '/images/back.png'} alt="back" width="45px"/></Link>
      </div>
    )
  }
}
