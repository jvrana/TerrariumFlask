import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { get_api } from '../utils/http_functions';
import { PROJECT_NAME } from '../constants/application';

get_api().then((x) => {
    console.log(x)
});

export default class WelcomeBanner extends Component {
    render() {
        return <Jumbotron>
            <h1>Welcome to {PROJECT_NAME}!</h1>
            <p>Organism engineering design tools</p>
            <Button variant="primary">Learn more</Button>
        </Jumbotron>
    }
}