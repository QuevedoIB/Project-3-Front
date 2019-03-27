import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/route-protection/PrivateRoute';
import AnonRoute from './components/route-protection/AnonRoute';
import Navbar from './components/navbar/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './providers/AuthProvider';
import Contacts from './pages/Contacts';
import Chat from './pages/Chat';
import Contact from './pages/Contact';
import Home from './pages/Home'; // <-
import Profile from './pages/Profile'; // <-
import './App.css';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className='container'>
          <Navbar data='data' />
          <Switch>
            <Route exact path='/' component={Home} />
            <AnonRoute exact path='/signup' component={Signup} />
            <AnonRoute exact path='/login' component={Login} />
            <PrivateRoute path='/contacts' component={Profile} />
            <PrivateRoute exact path='/contacts' component={Contacts} />
            <PrivateRoute exact path='/contacts' component={Contacts} />
            <PrivateRoute exact path='/chat/:id' component={Chat} />
            <PrivateRoute exact path='/contact/:id' component={Contact} />
            <PrivateRoute path='/private' component={Private} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
