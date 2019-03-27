import React, { Component } from 'react';
import './Question.css';

export default class Question extends Component {

  state = {
    class: '',
  }

  // getDerivedStateFromProps() {
  //   this.setState({
  //     class: 'question-from-right',
  //   })
  // }

  componentDidMount() {
    this.setState({
      class: '',
    })
  }

  // componentWillUnmount = () => {
  //   this.setState({
  //     class: 'question-to-left',
  //   })
  // }

  render() {
    const { imageUrl, me, notMe } = this.props.question;

    return (
      <div className={`slider-question ${this.state.class}`} >
        <img src={process.env.PUBLIC_URL + imageUrl} alt={me} width="300px" />
        <p>{me}</p>
        <div>
          <button onClick={(e) => { e.preventDefault(); return this.props.onClick(me) }}>ME</button>
          <button onClick={(e) => { e.preventDefault(); return this.props.onClick(notMe) }}>NOT ME</button>
        </div>
      </div>
    )
  }
}

