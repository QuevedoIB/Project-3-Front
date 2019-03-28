import React, { Component } from 'react';
import Question from '../personality-test/Question';
import './Personality.css';

export default class Personality extends Component {

  state = {
    personality: [],
    index: 0,
  }

  handleMe = async (value) => {
    const { index, personality } = this.state;
    if (index === this.props.questions.length - 1) {
      await this.setState({
        personality: [...personality, value]
      })

      this.props.onData(this.state.personality)

    } else {
      this.setState({
        personality: [...personality, value],
        index: index + 1,
      })
    }
  }

  render() {
    const { questions } = this.props;
    const { index } = this.state;
    const currentQuestion = questions[index];

    return (
      <div>
        <Question question={currentQuestion} onClick={this.handleMe} />
        <p className="counter-test">{index}/{questions.length}</p>
      </div>
    )
  }
}