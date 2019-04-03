import React, { Component } from 'react';
import { withContacts } from '../providers/ContactProvider';
import { withAuth } from '../providers/AuthProvider';
import SearchCard from '../components/contacts/SearchCard';
import Spinner from '../components/loading/Spinner';
import { Link } from 'react-router-dom';
import { sortArrayByDistance } from '../lib/helpers/harvesine-location';
import Navbar from '../components/navbar/Navbar';
import './pages-scss/search-people.scss';
import { startDragControl, getBoxBack } from '.././lib/helpers/drag-card';

class SearchPeople extends Component {

  state = {
    location: false,
    personality: false,
    listOfUsers: [],
    loading: true,
    indexUser: 0,
    noUsers: false,
    helper: true,
  }

  componentDidMount = async () => {

    this.getUsers();
    startDragControl(this.matchUser, this.getNext);

    await this.props.getCurrentSession();

  }


  onChange = (e) => {

    this.setState({
      [e.target.name]: !this.state[e.target.name],
    })

    this.getUsers();
  }

  getUsers = async () => {
    const resultUsers = await this.props.getUsers();
    if (resultUsers.length < 1) {
      return this.setState({
        loading: false,
        noUsers: true,
      })
    }

    if (this.state.personality && this.state.location) {
      let sortedUsersByPersonality = this.sortUsersListByPersonality(resultUsers, this.props.user)
      let sortedUserByBoth = sortArrayByDistance(sortedUsersByPersonality, this.props.user.location.coords);
      return this.setState({
        listOfUsers: sortedUserByBoth,
        loading: false,
        indexUser: 0,
        noUsers: false
      })
    } else if (this.state.personality) {
      const sortedUsers = this.sortUsersListByPersonality(resultUsers, this.props.user)
      return this.setState({
        listOfUsers: sortedUsers,
        loading: false,
        indexUser: 0,
        noUsers: false
      })
    } else if (this.state.location) {

      const sortedUsers = sortArrayByDistance(resultUsers, this.props.user.location.coords);

      return this.setState({
        listOfUsers: sortedUsers,
        loading: false,
        indexUser: 0,
        noUsers: false
      })
    } else {
      this.setState({
        listOfUsers: this.sortUsersRandom(resultUsers),
        loading: false,
        indexUser: 0,
        noUsers: false
      })
    }

  }

  getNext = (callbackResult) => {

    const { listOfUsers, indexUser } = this.state;

    if (indexUser !== listOfUsers.length - 1) {
      this.setState({
        indexUser: indexUser + 1
      })
    } else {
      this.setState({
        indexUser: indexUser + 1,
        noUsers: true
      })
    }

    if (callbackResult) {
      getBoxBack();
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


  matchUser = async (callbackResult) => {

    const { listOfUsers, indexUser } = this.state;
    try {

      if (indexUser <= listOfUsers.length - 1) {

        await this.props.matchUser(listOfUsers[indexUser]._id);
      }
      this.getNext();

    } catch (error) {
      console.log(error);
    }

    if (callbackResult) {
      getBoxBack();
    }
  }

  onNoContactsAndMatchesUser = () => {

    const { contacts, pending } = this.props.user;

    if (this.state.helper) {
      if (contacts.length === 0 && pending.length === 0) {
        return <div className='search-first-time-box'>
          <div>
            <h5>Drag left<br></br>to see Next</h5>
            <img src={process.env.PUBLIC_URL + '/images/drag-left.png'} alt='drag-left'></img>
          </div>
          <button className='link-button search-first-tiem-button' onClick={() => this.setState({ helper: false })}>Ok!</button>
          <div>
            <h5>Drag right<br></br>to send Match</h5>
            <img src={process.env.PUBLIC_URL + '/images/drag-right.png'} alt='drag-right'></img>
          </div>
        </div>
      }
    }
  }

  render() {
    const { location, personality, listOfUsers, loading, indexUser, noUsers } = this.state;

    const personalityMark = personality ? 'search-sort-marked' : '';
    const locationMark = location ? 'search-sort-marked' : '';

    return (

      <div className="search-section">
        <div>
          <h1 className='search-title'>Search Friends</h1>
          <header>
            <img className='bg-image' src={process.env.PUBLIC_URL + '/images/bg-edit.png'} alt='header' />
            <div>
              <form className='search-form'>
                <h3>Sort by</h3>
                <div className='search-items-container'>
                  <div>
                    <input className={personalityMark} type="checkbox" value={personality} name="personality" id="personality" onChange={this.onChange} />
                    <label htmlFor="personality">Personality </label>
                  </div>
                  <div>
                    <input className={locationMark} type="checkbox" value={location} name="location" id="location" onChange={this.onChange} />
                    <label htmlFor="location">Location </label>
                  </div>
                </div>
              </form>
            </div>
          </header>
          {this.onNoContactsAndMatchesUser()}
          <article className='search-info-box'>
            {noUsers ? <h1 className="no-users">No Users Available</h1> :
              <div>
                {loading ? <Spinner /> : <SearchCard userCard={listOfUsers[indexUser]} />}
                {/* <button onClick={this.getNext}>Next</button>
                <button onClick={this.matchUser}>Add</button> */}
              </div>
            }
          </article>
          <Navbar />
          <Link to='/profile' className="back-button"><img src={process.env.PUBLIC_URL + '/images/back.png'} alt="back" width="45px" /></Link>
        </div>
      </div>

    )
  }
}

export default withAuth(withContacts(SearchPeople));



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