import React, { Component } from 'react';
import { withContacts } from '../providers/ContactProvider';
import Personality from '../components/signup/personality-test/Personality';
import SearchCard from '../components/contacts/SearchCard';
import Spinner from '../components/loading/Spinner';

class SearchPeople extends Component {

  state = {
    location: false,
    personality: false,
    foundUser: {},
    loading: true,
  }

  componentDidMount = () => {
    this.getOne();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getOne = async () => {
    const resultUser = await this.props.getOne(this.state);
    console.log(resultUser, 'FRONT GOT IT')
    this.setState({
      foundUser: resultUser,
      loading: false,
    })
  }

  render() {
    const { location, personality, foundUser, loading } = this.state;
    console.log('USER ', foundUser)
    return (
      <section>
        <header>
          <form>
            <h3>Match by :</h3>
            <label htmlFor="personality">Personality </label>
            <input type="checkbox" value={personality} name={personality} id={personality} onChange={this.onChange} />
            <label htmlFor="location">Location </label>
            <input type="checkbox" value={location} name={location} id={location} onChange={this.onChange} />
          </form>
        </header>
        <article>
          {loading ? <Spinner /> : <SearchCard user={foundUser} />}
          <button onClick={this.getOne}>Next</button>
          <button onClick={this.getOne}>Add</button>
        </article>
      </section>
    )
  }
}

export default withContacts(SearchPeople);