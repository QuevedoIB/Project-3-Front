import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import parser from '../lib/file-upload';
import InfoFields from '../components/signup/InfoFields';
import Interests from '../components/signup/Interests';
import Personality from '../components/signup/personality-test/Personality';
import { questions } from '../data/questions';

const ENTER_KEY = 13;
const COMMA_KEY = 188;
const BACKSPACE_KEY = 8;

class Signup extends Component {

  state = {
    questions: questions,
    username: '',
    password: '',
    email: '',
    imageUrl: '',
    location: '',
    quote: '',
    interests: [],
    personality: [],
    valueInterests: '',
    indexPage: 0,
    allFields: true,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, email, imageUrl, quote, interests, personality, location } = this.state;
    const userData = {
      username,
      password,
      email,
      imageUrl,
      quote,
      interests,
      personality,
      location
    }

    this.props.signup(userData)
      .then(() => {
        this.props.history.push('/profile')
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleNext = (e) => {
    e.preventDefault();
    const { indexPage, username, password, email, quote, interests } = this.state;
    switch (indexPage) {
      case 0:
        if (!username || !password || !email) {
          return this.setState({
            allFields: false,
          })
        } else {
          return this.setState({
            indexPage: this.state.indexPage + 1,
            allFields: true,
          });
        }
      case 1:
        if (!quote || !interests.length) {
          return this.setState({
            allFields: false,
          })
        } else {
          return this.setState({
            indexPage: this.state.indexPage + 1,
            allFields: true,
          });
        }
      default:
        return this.setState({
          indexPage: this.state.indexPage + 1,
        });
    }
  }

  handleKeyUp = (e) => {
    //e.preventDefault();
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
    const { username, password, email, imageUrl, quote, valueInterests, interests, questions, indexPage, personality } = this.state;
    if (indexPage === 0) {
      return (
        <div>
          <p>Already have account?
          <Link to={"/login"} className="link-text"> Login</Link>
          </p>
          <InfoFields
            username={username}
            password={password}
            email={email}
            imageUrl={imageUrl}
            handleChange={this.handleChange}
            getLocation={this.getLocation}
          />
          <button onClick={this.handleNext} className="link-button">Next</button>
        </div>
      );
    } else if (indexPage === 1) {
      return (
        <>
          <Interests
            quote={quote}
            valueInterests={valueInterests}
            handleChange={this.handleChange}
            handleKeyUp={this.handleKeyUp}
            handleKeyDown={this.handleKeyDown}
            interests={interests}
          />
          <button onClick={this.handleNext} className="link-button">Next</button>
        </>
      );
    } else if (indexPage === 2) {
      if (personality.length === questions.length) {
        return (
          <>
            <p>All is ready!</p>
            <button type='submit' id="sign-up-fade" className="bottomLinks one" className="link-button">Sign Up</button>
          </>
        );
      } else {
        return <Personality questions={questions} onData={this.handleData} />
      }
    }
  }

  render() {
    console.log(this.state.imageUrl);
    return (
      <div className="page signup">
        <h1>Sign up</h1>
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
          {this.renderContent()}
          {!this.state.allFields && <h3>Missing Fields</h3>}
        </form>


      </div>
    )
  }
}

export default withAuth(Signup);



//const parser = require('../helpers/file-upload');
// router.post('/profile-image', parser.single('image'), requireLogged, async (req, res, next) => {
//   try {
//     await User.findByIdAndUpdate(req.session.currentUser._id, { $set: { imageUrl: req.file.url } });
//     const newSession = await User.findById(req.session.currentUser._id);
//     req.session.currentUser = newSession;
//     res.redirect('/profile');
//   } catch (err) {
//     next(err);
//   }
// });