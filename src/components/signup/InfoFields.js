import React, { Component } from 'react'
import './InfoFields.css';

export default class InfoFields extends Component {
  render() {
    return (
      <div className="column-content form-fields">
        <label htmlFor='username'>Username:</label>
        <input type="text" name="username" value={this.props.username} onChange={this.props.handleChange} required />
        <label htmlFor='password'>Password:</label>
        <input type="password" name="password" value={this.props.password} onChange={this.props.handleChange} required />
        <label htmlFor='email'>Email:</label>
        <input type="email" name="email" value={this.props.email} onChange={this.props.handleChange} required />

        {/* comprobar si se suben las imágenes */}

        <span className="image-upload"><input type="file" name="imageUrl" className="input-img" />
          Choose Image</span>
      </div>
    )
  }
}
