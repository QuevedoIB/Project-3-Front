import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import InfoFields from '../components/signup/InfoFields';
// import Interests from '../components/signup/Interests';
// import Personality from '../components/signup/personality-test/Personality';
// import { questions } from '../data/questions';

import './pages-scss/signup.scss';

import firebase from 'firebase';


// const ENTER_KEY = 13;
// const COMMA_KEY = 188;
// const BACKSPACE_KEY = 8;

const config = {
  apiKey: "AIzaSyBPiQmXBjc3QAVnensxPXbuxjeYgm1-kb8",
  authDomain: "http://localhost:3000",
  databaseURL: "http://localhost:5000",
  storageBucket: "<BUCKET>.appspot.com",
};
firebase.initializeApp(config);

class Signup extends Component {

  state = {
    username: '',
    password: '',
    email: '',
    imageUrl: '',
    allFields: true,
    imageProfile: '',
    isUploading: false,
    progress: 0
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, email, imageUrl } = this.state;
    const userData = {
      username,
      password,
      email,
      imageUrl,
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

  // handleNext = (e) => {
  //   e.preventDefault();
  //   const { indexPage, username, password, email, quote, interests } = this.state;
  //   switch (indexPage) {
  //     case 0:
  //       if (!username || !password || !email) {
  //         return this.setState({
  //           allFields: false,
  //         })
  //       } else {
  //         return this.setState({
  //           indexPage: this.state.indexPage + 1,
  //           allFields: true,
  //         });
  //       }
  //     case 1:
  //       if (!quote || !interests.length) {
  //         return this.setState({
  //           allFields: false,
  //         })
  //       } else {
  //         return this.setState({
  //           indexPage: this.state.indexPage + 1,
  //           allFields: true,
  //         });
  //       }
  //     default:
  //       return this.setState({
  //         indexPage: this.state.indexPage + 1,
  //       });
  //   }
  // }

  // handleKeyUp = (e) => {

  //   const key = e.keyCode;

  //   if (key === ENTER_KEY || key === COMMA_KEY) {
  //     this.addTag();
  //   }
  // }

  // handleKeyDown = (e) => {
  //   const key = e.keyCode;
  //   if (key === BACKSPACE_KEY && !this.state.valueInterests) {
  //     this.editPrevTag();
  //   } else if (key === 13) {
  //     e.preventDefault();
  //   }
  // }

  // addTag = () => {
  //   const { interests, valueInterests } = this.state;
  //   let interest = valueInterests.trim();

  //   interest = interest.replace(/,/g, "");

  //   if (!interest) {
  //     return;
  //   }

  //   this.setState({
  //     interests: [...interests, interest],
  //     valueInterests: ""
  //   });
  // }

  // getLocation = (locationValue) => {
  //   this.setState({
  //     location: locationValue
  //   })
  // }

  // editPrevTag = () => {
  //   let { interests } = this.state;

  //   const interest = interests.pop();

  //   this.setState({ interests, valueInterests: interest });
  // }

  // handleData = (array) => {
  //   this.setState({
  //     personality: array,
  //   })
  // }

  handleUploadStart = () => {
    this.setState({ isUploading: true, progress: 0 });
  }
  handleProgress = (progress) => {
    this.setState({ progress });
  }
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    this.setState({ imageProfile: filename, progress: 100, isUploading: false });
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({ imageUrl: url }));
  };


  // renderContent() {
  //   const { username, password, email, imageUrl } = this.state;
  //   if (indexPage === 0) {
  //     return (
  //       <div>
  //         <p>Already have account?
  //         <Link to={"/login"} className="link-text"> Login</Link>
  //         </p>
  //         <InfoFields
  //           username={username}
  //           password={password}
  //           email={email}
  //           imageUrl={imageUrl}
  //           handleChange={this.handleChange}
  //           getLocation={this.getLocation}
  //           handleUploadStart={this.handleUploadStart}
  //           handleProgress={this.handleProgress}
  //           handleUploadError={this.handleUploadError}
  //           handleUploadSuccess={this.handleUploadSuccess}
  //         />
  //         <button onClick={this.handleNext} className="link-button">Next</button>
  //       </div>
  //     );
  //   } else if (indexPage === 1) {
  //     return (
  //       <>
  //         <Interests
  //           quote={quote}
  //           valueInterests={valueInterests}
  //           handleChange={this.handleChange}
  //           handleKeyUp={this.handleKeyUp}
  //           handleKeyDown={this.handleKeyDown}
  //           interests={interests}
  //         />
  //         <button onClick={this.handleNext} className="link-button">Next</button>
  //       </>
  //     );
  //   } else if (indexPage === 2) {
  //     if (personality.length === questions.length) {
  //       return (
  //         <>
  //           <p>All is ready!</p>
  //           <button type='submit' id="sign-up-fade" className="bottomLinks one" className="link-button">Sign Up</button>
  //         </>
  //       );
  //     } else {
  //       return <Personality questions={questions} onData={this.handleData} />
  //     }
  //   }
  // }

  render() {
    const { username, password, email, imageUrl } = this.state;
    return (
      <div className="page signup">
         <img className="bg-image" src={process.env.PUBLIC_URL + '/images/bg-pages.png'} />
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data" className="user-form">
          <div>
            <p className="login-text">Already have account?
          <Link to={"/login"} className="link-white"> Login</Link>
            </p>
            <h1 className="title">Sign up</h1>
            <InfoFields
              username={username}
              password={password}
              email={email}
              imageUrl={imageUrl}
              handleChange={this.handleChange}
              handleUploadStart={this.handleUploadStart}
              handleUploadError={this.handleUploadError}
              handleUploadSuccess={this.handleUploadSuccess}
            />
            <button type='submit' className="link-button">Sign Up</button>
          </div>
          {!this.state.allFields && <h3>Missing Fields</h3>}
        </form>
      </div>
    )
  }
}

export default withAuth(Signup);