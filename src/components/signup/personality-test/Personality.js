import React, { Component } from 'react';
import Question from '../personality-test/Question';

export default class Personality extends Component {

  state = {
    personality: [],
    index: 0,
    completed: false,
  }

  handleMe = (value) => {
    const { index, personality } = this.state;
    if (index === personality.length - 2) {
      this.setState({
        personality: [...personality, value],
        index: index + 1,
        completed: true,
      })
    } else {
      this.setState({
        personality: [...personality, value],
        index: index + 1,
      })
    }
  }

  render() {
    const { index, personality, completed } = this.state;
    const currentQuestion = this.props.questions[index];
    return (
      <div>
        <Question question={currentQuestion} complted={completed} onClick={this.handleMe} />
        <p>{index}/{personality}</p>
      </div>
    )
  }
}