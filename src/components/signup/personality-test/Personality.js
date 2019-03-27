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
    if (index === this.props.questions.length - 1) {
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
    console.log('completed ', completed, index, this.props.questions.length);
    
    return (
      <div>
        <Question question={currentQuestion} completed={completed} onClick={this.handleMe} />
        <p>{index}/{personality}</p>
      </div>
    )
  }
}