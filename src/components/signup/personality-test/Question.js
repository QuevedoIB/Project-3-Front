import React, { Component } from 'react';
import './Question.css'

export default class Question extends Component {

  state = {
    class: '',
  }

  getDerivedStateFromProps() {
    this.setState({
      class: 'question-to-left',
    })
  }

  componentDidMount() {
    this.setState({
      class: '',
    })
  }

  componentWillUnmount = () => {
    this.setState({
      class: 'question-to-left',
    })
  }

  render() {
    const { completed } = this.props;
    const { imageUrl, me, notMe } = this.props.question;
    return (
      <div style={this.state.class}>
        <img src={imageUrl} alt={me} />
        <div>
          {completed ? <button type='submit' id="inventory" class="bottomLinks one">Sign Up</button> : <>
            <button onClick={() => this.props.onClick(me)}>ME</button>
            <button onClick={() => this.props.onClick(notMe)}>NOT ME</button>
          </>
          }
        </div>
      </div>
    )
  }
}

