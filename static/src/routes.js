import React from 'react'
import { Route, Switch } from 'react-router'
import Home from './components/Home'
import Navigation from './components/Navigation'
import Welcome from './components/Welcome'
import LoginView from './components/LoginView'
import RegisterView from './components/RegisterView'

const routes = (
    <div>
        <Navigation/>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route path="/home" component={Home} />
      <Route path="/login" component={LoginView} />
      <Route path="/register" component={RegisterView} />
      {/*<Route path="/counter" component={Counter} />*/}
      {/*<Route component={NoMatch} />*/}
    </Switch>
    </div>
);

export default routes