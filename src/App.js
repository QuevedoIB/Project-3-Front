import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/route-protection/PrivateRoute';
import AnonRoute from './components/route-protection/AnonRoute';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './providers/AuthProvider';
import Contacts from './pages/Contacts';
import ChatPage from './pages/ChatPage';
import Contact from './pages/Contact';
import Home from './pages/Home'; // <-
import Profile from './pages/Profile'; // <-
import ProfileEdit from './pages/ProfileEdit';
import SearchPeople from './pages/SearchPeople';
import './App.scss';
import ContactProvider from './providers/ContactProvider';
import CompleteProfile from './pages/ProfileComplete';
import Error404 from './pages/error/Error404';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <ContactProvider>
          <Switch>
            <AnonRoute exact path='/' component={Home} />
            <AnonRoute exact path='/signup' component={Signup} />
            <AnonRoute exact path='/login' component={Login} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute path='/profile/edit' component={ProfileEdit} />
            <PrivateRoute path='/profile/complete' component={CompleteProfile} />
            <PrivateRoute exact path='/contacts' component={Contacts} />
            <PrivateRoute exact path='/search-people' component={SearchPeople} />
            <PrivateRoute exact path='/chat/:id' component={ChatPage} />
            <PrivateRoute exact path='/contact/:id' component={Contact} />
            <PrivateRoute path='/private' component={Private} />
            <Route path='*' component={Error404} />
          </Switch>
        </ContactProvider>
      </AuthProvider>
    )
  }
}

export default App;
