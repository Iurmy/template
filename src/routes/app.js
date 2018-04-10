import React from 'react'
// import { ConnectedRouter as Router } from 'react-router-redux'
// import { Route, Switch } from 'react-router'
import { Router, Route, Switch} from 'react-router-dom';
import { App, Login } from '../containers'
import {requireAuthentication} from './requireAuthentication';

export default (history, navbar) => {
  const routes = (
    <Router keyLength={12} history={history}>
      <Switch>
        <Route exec path="/login" component={Login} />
        <Route exec path="*" component={requireAuthentication(App)} />
      </Switch>
    </Router>
  )
  return routes
}
