import React from 'react'
import {Redirect, Route, Switch} from 'react-router'
import WelcomeBanner from './components/WelcomeBanner'
import Users from './components/Users'
import ProfileContainer from './components/ProfileContainer'
import RegisterForm from "./components/RegisterForm";
import Task from './components/FakeTask';

const routes = (
    <Switch>
        <Route exact path="/" >
            <Redirect from="/" to="/home"/>
        </Route>
        <Route path="/home" component={WelcomeBanner}/>
        <Route path="/users" component={Users}/>
        <Route path="/profile" component={ProfileContainer}/>
        <Route path="/register" component={RegisterForm}/>
        <Route path="/task" component={Task}/>
    </Switch>
);

export default routes