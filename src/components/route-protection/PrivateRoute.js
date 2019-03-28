import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../../providers/AuthProvider';

const PrivateRoute = ({ component: Component, isLogged, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props => {
        if (isLogged) {
          return <Component {...props} />
        } else {
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
      }}
    />
  )
}



export default withAuth(PrivateRoute);