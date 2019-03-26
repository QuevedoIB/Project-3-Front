import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import parser from '../lib/file-upload';

class Signup extends Component {

  state = {
    username: '',
    password: '',
    email: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.props.signup({ username, password })
      .then(() => {
        this.setState({
          username: "",
          password: "",
        });
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit} enctype="multipart/form-data">
          <label for='username'>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          <label for='password'>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <label for='email'>Email:</label>
          <input type="email" name="email" value={password} onChange={this.handleChange} />

          {/* comprobar si se suben las imágenes */}

          <span class="image-upload"><input type="file" name="imageUrl" class="input-img" />
            Choose Image</span>
          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?
          <Link to={"/login"}> Login</Link>
        </p>

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