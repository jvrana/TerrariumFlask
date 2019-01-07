import React from 'react'
import {Redirect, Route, Switch} from 'react-router'
import Home from './components/Home'
import LoginView from './components/LoginView'
import RegisterView from './components/RegisterView'
import UserView from './components/UserView'
import requireAuthentication from './components/authentication/RequireAuthentication';

const routes = (
    <Switch>
        <Route exact path="/" >
            <Redirect from="/" to="/home"/>
        </Route>
        <Route path="/home" component={requireAuthentication(Home)}/>
        <Route path="/login" component={LoginView}/>
        <Route path="/register" component={RegisterView}/>
        <Route path="/user" component={requireAuthentication(UserView)}/>
    </Switch>
);

export default routes