import {Route} from "react-router-dom";
import React from "react";
import history from '../../history';

// Wraps an element in a router link
const RouterLink = (props) => {
    return <Route render={({history}) => (
        <div onClick={() => history.push(props.to)}>
        {props.children}
        </div>
    )} />
};

export default RouterLink;