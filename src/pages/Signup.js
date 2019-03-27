import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import parser from '../lib/file-upload';
import InfoFields from '../components/signup/InfoFields';
import Interests from '../components/signup/Interests';

const ENTER_KEY = 13;
const COMMA_KEY = 188;
const BACKSPACE_KEY = 8;




class Signup extends Component {

  state = {
    username: '',
    password: '',
    email: '',
    preferences: [],
    interests: [],
    valueInterests: '',
    page: 'infoFields'
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
      page: 'interests'
    });
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
    if (this.state.page === 'infoFields') {
      const { username, password, email } = this.state;
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
          <button onClick={this.handleNext}>Next</button>
        </div>
      );
    } else if (this.state.page === 'interests') {
      const { valueInterests, interests } = this.state;
      return (
        <Interests
          valueInterests={valueInterests}
          handleChange={this.handleChange}
          handleKeyUp={this.handleKeyUp}
          handleKeyDown={this.handleKeyDown}
          interests={interests}
        />
      );
    }
  }

  render() {

    console.log(this.state)


    return (
      <div>
        <form onSubmit={this.handleFormSubmit} enctype="multipart/form-data">
          {this.renderContent()}
          <input type="submit" value="Signup" />
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