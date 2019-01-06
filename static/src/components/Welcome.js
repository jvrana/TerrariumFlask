import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { get_api } from '../utils/http_functions';

get_api().then((x) => {
    console.log(x)
});

export default class Welcome extends Component {
    render() {
        return <Jumbotron>
            <h1>Welcome!</h1>
            <p>This is a jumbo welcome message</p>
            <Button variant="primary">Learn more</Button>
        </Jumbotron>
    }
}