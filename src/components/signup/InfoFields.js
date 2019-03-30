import React, { Component } from 'react'
import './InfoFields.css';
import { mainMap, getLocationValue } from '../../lib/autocomplete-location';
import { getCoordsFromPlace } from '../../lib/filter-by-location';

import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';


export default class InfoFields extends Component {

  componentDidMount() {
    mainMap();
  }

  componentWillUnmount = async () => {
    const coords = await getCoordsFromPlace(getLocationValue());
    console.log(coords)
    this.props.getLocation(coords);
  }

  render() {
    return (
      <div className="column-content form-fields">
        <label htmlFor='username'>Username:</label>
        <input type="text" name="username" value={this.props.username} onChange={this.props.handleChange} required />
        <label htmlFor='password'>Password:</label>
        <input type="password" name="password" value={this.props.password} onChange={this.props.handleChange} required />
        <label htmlFor='email'>Email:</label>
        <input type="email" name="email" value={this.props.email} onChange={this.props.handleChange} required />
        <div id="location" className='geocoder'>
        </div>

        {/* comprobar si se suben las imágenes */}

        {/* <span className="image-upload"><input type="file" name="imageUrl" className="input-img" value={this.props.imageUrl} onChange={this.props.handleChange} />
          Choose Image</span>
        <div id="map" className="map-create-event hide"></div> */}
        <FileUploader
          accept="image/*"
          name="imageUrl"
          randomizeFilename
          storageRef={firebase.storage().ref('images')}
          onUploadStart={this.props.handleUploadStart}
          onUploadError={this.props.handleUploadError}
          onUploadSuccess={this.props.handleUploadSuccess}
          onProgress={this.props.handleProgress}
        />
      </div>
    )
  }
}
