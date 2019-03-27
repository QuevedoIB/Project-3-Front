import React, { Component } from 'react'

export default class InfoFields extends Component {
  render() {
    return (
      <div>
        <label for='username'>Username:</label>
        <input type="text" name="username" value={this.props.username} onChange={this.props.handleChange} />
        <label for='password'>Password:</label>
        <input type="password" name="password" value={this.props.password} onChange={this.props.handleChange} />
        <label for='email'>Email:</label>
        <input type="email" name="email" value={this.props.email} onChange={this.props.handleChange} />

        {/* comprobar si se suben las imágenes */}

        <span class="image-upload"><input type="file" name="imageUrl" class="input-img" />
          Choose Image</span>
      </div>
    )
  }
}
