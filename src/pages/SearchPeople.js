import React, { Component } from 'react';
import { withContacts } from '../providers/ContactProvider';
import Personality from '../components/signup/personality-test/Personality';
import SearchCard from '../components/contacts/SearchCard';
import Spinner from '../components/loading/Spinner';

class SearchPeople extends Component {

  state = {
    location: false,
    personality: false,
    listOfUsers: [],
    loading: true,
    indexUser: 0,
  }

  componentDidMount = () => {
    this.getUsers();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    })

    this.getUsers();
  }

  getUsers = async () => {
    const resultUsers = await this.props.getUsers();

    if (this.state.personality) {
      let sortedUsers = this.sortUsersListByPersonality(resultUsers, this.props.user)
      this.setState({
        listOfUsers: sortedUsers,
        loading: false,
        indexUser: 0,
      })
    } else {
      this.setState({
        listOfUsers: this.sortUsersRandom(resultUsers),
        loading: false,
        indexUser: 0,
      })
    }

  }

  getNext = () => {
    if (this.state.indexUser < this.state.listOfUsers.length - 1) {
      this.setState({
        indexUser: this.state.indexUser + 1
      })
    }
  }

  sortUsersListByPersonality = (usersList, user) => {
    usersList.forEach(person => {
      let counter = 0;
      person.personality.forEach((p, index) => {
        if (user.personality.includes(p)) {
          counter++;
        }
      })
      person.counter = counter;
    })

    return usersList.sort((a, b) => b.counter - a.counter);
  }

  sortUsersRandom = (array) => {

    const copyArray = array.slice();

    let currentIndex = copyArray.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = copyArray[currentIndex];
      copyArray[currentIndex] = copyArray[randomIndex];
      copyArray[randomIndex] = temporaryValue;
    }

    return copyArray;
  }


  matchUser = async () => {
    const { listOfUsers, indexUser } = this.state;
    try {
      await this.props.matchUser(listOfUsers[indexUser]._id);
      this.getNext();
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    const { location, personality, listOfUsers, loading, indexUser } = this.state;
    return (
      <section>
        <header>
          <form>
            <h3>Match by :</h3>
            <label htmlFor="personality">Personality </label>
            <input type="checkbox" value={personality} name="personality" id="personality" onChange={this.onChange} />
            <label htmlFor="location">Location </label>
            <input type="checkbox" value={location} name="location" id="location" onChange={this.onChange} />
          </form>
        </header>
        <article>
          {loading ? <Spinner /> : <SearchCard user={listOfUsers[indexUser]} />}
          <button onClick={this.getNext}>Next</button>
          <button onClick={this.matchUser}>Add</button>
        </article>
      </section>
    )
  }
}

export default withContacts(SearchPeople);



// const me = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

// const array = [{
//   personality: ['a', 1, 2, 3, 4, 5, 6, 7, 8, 'h'],
// },
// {
//   personality: ['a', 1, 'j', 3, 4, 5, 'f', 7, 8, 'h']
// }];


// array.forEach(person => {
//   let counter = 0;
//   person.personality.forEach((p, index) => {
//     if (me.includes(p)) {
//       counter++;
//     }
//   })
//   person.counter = counter;
// })

// array.sort((a, b) => b.counter - a.counter);