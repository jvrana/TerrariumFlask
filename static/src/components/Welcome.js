import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

export class Welcome extends Component {
    render() {
        return <Jumbotron>
            <h1>Welcome!</h1>
            <p>This is a jumbo welcome message</p>
        </Jumbotron>
    }
}