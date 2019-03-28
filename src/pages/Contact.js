import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import userService from '../lib/user-service';
import ContactProfile from '../components/contacts/ContactProfile'; // <-
import Spinner from '../components/loading/Spinner';

class Contact extends Component {

  state = {
    contact: null,
    loading: true,
  }

  componentDidMount = async () => {
    try {
      const contact = await userService.getOneContact(this.props.match.params.id);

      this.setState({
        contact,
        loading: false,
      })

    } catch (err) {
      console.log(err);
    }
  }

  render() {

    const { loading, contact } = this.state;

    if (loading) {
      return <Spinner />
    } else {
      return <ContactProfile contact={contact} />;
    }
  }
}

export default withRouter(Contact);