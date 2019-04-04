import React, { Component } from 'react';
import './Question.css';

export default class Question extends Component {

  state = {
    class: '',
  }

  componentDidMount() {
    this.setState({
      class: '',
    })
  }

  render() {
    const { imageUrl, me, notMe } = this.props.question;

    return (
      <div className={`slider-question ${this.state.class}`} >
        <div className="personality-card">
          <p className="personality-text">{me}</p>
          <img src={process.env.PUBLIC_URL + imageUrl} alt={me} width="100%" />
        </div>
        <div>
          <button onClick={(e) => { e.preventDefault(); return this.props.onClick(me) }} className="me-button">ME</button>
          <button onClick={(e) => { e.preventDefault(); return this.props.onClick(notMe) }} className="not-me-button">NOT ME</button>
        </div>
      </div>
    )
  }
}

