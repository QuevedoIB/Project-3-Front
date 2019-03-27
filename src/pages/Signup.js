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
    interests: [],
    valueInterests: '',
    indexPage: 0,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.props.signup({ username, password })
      .then(() => {
        this.setState({
          username: "",
          email: "",
          password: "",
        });
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleNext = () => {
    this.setState({
      indexPage: this.state.indexPage + 1,
    });
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

  editPrevTag = () => {
    let { interests } = this.state;

    const interest = interests.pop();

    this.setState({ interests, valueInterests: interest });
  }

  renderContent() {
    const { username, password, email, valueInterests, interests, questions, indexPage } = this.state;
    if (indexPage === 0) {
      return (
        <div>
          <p>Already have account?
          <Link to={"/login"}> Login</Link>
          </p>
          <InfoFields
            username={username}
            password={password}
            email={email}
            handleChange={this.handleChange}
          />
        </div>
      );
    } else if (indexPage === 1) {
      return (
        <Interests
          valueInterests={valueInterests}
          handleChange={this.handleChange}
          handleKeyUp={this.handleKeyUp}
          handleKeyDown={this.handleKeyDown}
          interests={interests}
        />
      );
    } else if (indexPage === 2) {
      return <Personality questions={questions} />
    }
  }

  render() {

    console.log(this.state)


    return (
      <div>
        <form onSubmit={this.handleFormSubmit} enctype="multipart/form-data" >
          {this.renderContent()}
          <button onClick={this.handleNext}>Next</button>
          {/* <button type="submit" onKeyPress={(e) => { e.target.keyCode === 13 && e.preventDefault(); }}>Submit</button> */}
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