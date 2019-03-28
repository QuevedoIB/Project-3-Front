import React, { Component } from 'react';
import { withContacts } from '../providers/ContactProvider';
import { withRouter } from 'react-router-dom';
import ContactProfile from '../components/contacts/ContactProfile'; // <-
import Spinner from '../components/loading/Spinner';

class Contact extends Component {

  state = {
    contact: null,
    loading: true,
  }

  componentDidMount = async () => {

    try {
      const contact = await this.props.getOneContact(this.props.match.params.id);

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

export default withRouter(withContacts(Contact));