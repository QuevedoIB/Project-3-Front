import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
//import Navbar from '../components/navbar/Navbar';
import Interests from '../components/signup/Interests';
import Personality from '../components/signup/personality-test/Personality';
import { questions } from '../data/questions';
import Spinner from '../components/loading/Spinner';

import './pages-scss/profileComplete.scss';

const ENTER_KEY = 13;
const COMMA_KEY = 188;
const BACKSPACE_KEY = 8;


class CompleteProfile extends Component {

  state = {
    questions: questions,
    location: [],
    quote: '',
    interests: [],
    personality: [],
    valueInterests: '',
    indexPage: 0,
    allFields: true,
    imageProfile: '',
    isUploading: false,
    progress: 0,
    isLoaded: false,
  };

  componentDidMount() {
    this.setState({
      isLoaded: true,
    })
  }

  //   this.props.signup(userData)
  //   .then(() => {
  //     this.props.history.push('/profile')
  //   })
  //   .catch(error => console.log(error))
  // }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { quote, interests, personality, location } = this.state;
    const userData = {
      quote,
      interests,
      personality,
      location
    }

    await this.props.completeProfile(userData);

    this.props.history.push('/profile');
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleNext = (e) => {
    e.preventDefault();
    const { indexPage, location, quote, interests } = this.state;

    if (indexPage === 0) {
      if (!location || !quote || !interests.length) {
        return this.setState({
          allFields: false,
        })
      } else {
        return this.setState({
          indexPage: this.state.indexPage + 1,
          allFields: true,
        });
      }
    } else {
      return this.setState({
        indexPage: this.state.indexPage + 1,
      });
    }
  }

  handleKeyUp = (e) => {

    const key = e.keyCode;

    if (key === ENTER_KEY || key === COMMA_KEY) {
      this.addTag();
    }
  }

  handleKeyDown = (e) => {
    const key = e.keyCode;
    if (key === BACKSPACE_KEY && !this.state.valueInterests) {
      this.editPrevTag();
    } else if (key === 13) {
      e.preventDefault();
    }
  }

  addTag = () => {
    const { interests, valueInterests } = this.state;
    let interest = valueInterests.trim();

    interest = interest.replace(/,/g, "");

    if (!interest) {
      return;
    }

    this.setState({
      interests: [...interests, interest],
      valueInterests: ""
    });
  }

  getLocation = (locationValue) => {
    this.setState({
      location: locationValue
    })
  }

  editPrevTag = () => {
    let { interests } = this.state;

    const interest = interests.pop();

    this.setState({ interests, valueInterests: interest });
  }

  handleData = (array) => {
    this.setState({
      personality: array,
    })
  }


  renderContent() {
    const { quote, valueInterests, interests, questions, indexPage, personality } = this.state;

    if (!this.state.isLoaded) {
      return <Spinner />
    }

    if (indexPage === 0) {
      return (
        <>
          <Interests
            quote={quote}
            valueInterests={valueInterests}
            handleChange={this.handleChange}
            handleKeyUp={this.handleKeyUp}
            handleKeyDown={this.handleKeyDown}
            interests={interests}
            getLocation={this.getLocation}
          />
          <button onClick={this.handleNext} className="link-button">Next</button>
        </>
      );
    } else if (indexPage === 1) {
      if (personality.length === questions.length) {
        return (
          <>
            <p className="ready-text">Everything is ready!</p>
            <button type='submit' id="sign-up-fade" className="bottomLinks one link-button">Let's meet people</button>
          </>
        );
      } else {
        return <Personality questions={questions} onData={this.handleData} />
      }
    }
  }

  render() {
    return (
      <>
        <img src={process.env.PUBLIC_URL + '/images/bg-edit.png'} className="bg-image" alt='header' />
        <div className="page signup profile-complete">
        <h1 className="complete-title">Complete your profile</h1>
          <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
            {this.renderContent()}
            {!this.state.allFields && <h3>Missing Fields</h3>}
          </form>
          <Link to='/profile'>Back to Profile</Link>
        </div>
      </>
    )
  }
}

export default withAuth(CompleteProfile);