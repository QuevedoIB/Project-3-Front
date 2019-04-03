import React, { Component } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import './Dictaphone.scss'

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const options = {
  autoStart: false
}

// const Dictaphone = ({
//   transcript,
//   resetTranscript,
//   browserSupportsSpeechRecognition
// }) => {
//   if (!browserSupportsSpeechRecognition) {
//     return null;
//   }

//   if (transcript) {
//     // this.props.onAudioMessage(transcript);
//     console.log(Dictaphone)
//   }

//   return (
//     <div>
//       <button onClick={resetTranscript}>Reset</button>
//     </div>
//   );
// };

class Dictaphone extends Component {
  constructor(props) {
    super(props);
    this.transcript = this.props.transcript;
  }

  state = {
    recording: false,
  }

  componentDidMount = () => {
    if (!this.props.browserSupportsSpeechRecognition) {
      return null;
    }
  }

  handleClick = () => {
    const { recording } = this.state;

    console.log(this.props.transcript, 'HOOOLA')
    if (recording) {
      this.setState({
        recording: false,
      });

      if (this.props.transcript) {
        this.props.resetTranscript();
        this.props.handleSendMessage(this.props.transcript)
      }

      this.props.abortListening();
    } else {
      this.setState({
        recording: true,
      });
      this.props.startListening();
    }
  }

  render() {

    const audioImage = this.state.recording ? '/images/microphone-off.png' : '/images/microphone.png';

    return (
      <button className='chat-audio-button' onClick={() => this.handleClick()}><img src={process.env.PUBLIC_URL + audioImage} alt='audio' /></button>
    )
  }
}

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(options)(Dictaphone);