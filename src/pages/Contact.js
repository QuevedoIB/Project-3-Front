import React, { Component } from 'react';
import { withContacts } from '../providers/ContactProvider';
import { withRouter, Link } from 'react-router-dom';
import ContactProfile from '../components/contacts/ContactProfile'; // <-
import Spinner from '../components/loading/Spinner';
import Navbar from '../components/navbar/Navbar';

class Contact extends Component {

  state = {
    contact: null,
    loading: true,
  }

  async componentDidMount() {

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
      return <div className="page">
        <Spinner />
      </div>
    } else {
      return (
        <div className="page">
          <img src={process.env.PUBLIC_URL + '/images/bg-profile.png'} className="bg-image" alt='header' />
          <ContactProfile contact={contact} />;
          <Navbar />
        <Link to='/contacts' className="back-button"><img src={process.env.PUBLIC_URL + '/images/back.png'} alt="back" width="45px"/></Link>
     
      </div>
      );

    }
  }
}

export default withRouter(withContacts(Contact));